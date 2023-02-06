import { fetch, EventSource } from 'extra-fetch'
import { post, IRequestOptionsTransformer } from 'extra-request'
import { url, appendPathname, text, keepalive, signal, basicAuth, header } from 'extra-request/transformers'
import { Observable } from 'rxjs'
import { ok } from 'extra-response'
import { assert, CustomError } from '@blackglory/errors'
import { setTimeout } from 'extra-timers'
import { raceAbortSignals, timeoutSignal } from 'extra-abort'
import { Falsy } from '@blackglory/prelude'
import { expectedVersion } from './contract.js'

export interface IPubSubClientOptions {
  server: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  heartbeat?: IHeartbeatOptions
  timeout?: number
}

export interface IPubSubClientRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export interface IPubSubClientObserveOptions {
  heartbeat?: IHeartbeatOptions
}

export interface IHeartbeatOptions {
  timeout: number
}

export class PubSubClient {
  constructor(private options: IPubSubClientOptions) {}

  /**
   * @throws {AbortError}
   */
  async publish(
    namespace: string
  , channel: string
  , value: string
  , options: IPubSubClientRequestOptions = {}
  ): Promise<void> {
    const req = post(
      ...this.getCommonTransformers(options)
    , appendPathname(`/namespaces/${namespace}/channels/${channel}`)
    , text(value)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {HeartbeatTimeoutError} from Observable
   */
  subscribe(
    namespace: string
  , channel: string
  , options: IPubSubClientObserveOptions = {}
  ): Observable<string> {
    return new Observable(observer => {
      const url = new URL(
        `/namespaces/${namespace}/channels/${channel}`
      , this.options.server
      )

      const es = new EventSource(url.href)
      es.addEventListener('message', (evt: MessageEvent) => observer.next(evt.data))
      es.addEventListener('error', evt => {
        close()
        observer.error(evt)
      })

      let cancelHeartbeatTimeout: (() => void) | null = null
      if (options.heartbeat ?? this.options.heartbeat) {
        const timeout = (
          options.heartbeat?.timeout ??
          this.options.heartbeat?.timeout
        )!
        assert(Number.isInteger(timeout), 'timeout must be an integer')
        assert(timeout > 0, 'timeout must greater than zero')

        es.addEventListener('open', () => {
          updateTimeout()

          es.addEventListener('heartbeat', updateTimeout)
        })

        function updateTimeout() {
          if (cancelHeartbeatTimeout) cancelHeartbeatTimeout()
          cancelHeartbeatTimeout = setTimeout(timeout, heartbeatTimeout)
        }
      }

      return close

      function close() {
        if (cancelHeartbeatTimeout) cancelHeartbeatTimeout()
        es.close()
      }

      function heartbeatTimeout() {
        close()
        observer.error(new HeartbeatTimeoutError())
      }
    })
  }

  private getCommonTransformers(
    options: IPubSubClientRequestOptions
  ): Array<IRequestOptionsTransformer | Falsy> {
    const auth = this.options.basicAuth

    return [
      url(this.options.server)
    , auth && basicAuth(auth.username, auth.password)
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , (options.keepalive ?? this.options.keepalive) && keepalive()
    , header('Accept-Version', expectedVersion)
    ]
  }
}

export class HeartbeatTimeoutError extends CustomError {}
