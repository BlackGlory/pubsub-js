import { fetch, EventSource } from 'extra-fetch'
import { post, IHTTPOptionsTransformer } from 'extra-request'
import { url, pathname, text, searchParams, keepalive, signal, basicAuth }
  from 'extra-request/transformers/index.js'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ok } from 'extra-response'
import { assert, CustomError } from '@blackglory/errors'
import { setTimeout } from 'extra-timers'
import { raceAbortSignals, timeoutSignal } from 'extra-abort'
import { Falsy } from 'justypes'

export { HTTPClientError } from '@blackglory/http-status'

export interface IPubSubClientOptions {
  server: string
  token?: string
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
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

export interface IPubSubClientObserveOptions {
  token?: string
  heartbeat?: IHeartbeatOptions
}

export interface IHeartbeatOptions {
  timeout: number
}

export class PubSubClient {
  constructor(private options: IPubSubClientOptions) {}

  private getCommonTransformers(
    options: IPubSubClientRequestOptions
  ): Array<IHTTPOptionsTransformer | Falsy> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth

    return [
      url(this.options.server)
    , auth && basicAuth(auth.username, auth.password)
    , token && searchParams({ token })
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , keepalive(options.keepalive ?? this.options.keepalive)
    ]
  }

  /**
   * @throws {AbortError}
   */
  async publish(
    namespace: string
  , val: string
  , options: IPubSubClientRequestOptions = {}
  ): Promise<void> {
    const req = post(
      ...this.getCommonTransformers(options)
    , pathname(`pubsub/${namespace}`)
    , text(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async publishJSON<T>(
    namespace: string
  , val: T
  , options?: IPubSubClientRequestOptions
  ): Promise<void> {
    return await this.publish(namespace, JSON.stringify(val), options)
  }

  /**
   * @throws {HeartbeatTimeoutError} from Observable
   */
  subscribe(
    namespace: string
  , options: IPubSubClientObserveOptions = {}
  ): Observable<string> {
    return new Observable(observer => {
      const token = options.token ?? this.options.token
      const url = new URL(`/pubsub/${namespace}`, this.options.server)
      if (token) url.searchParams.append('token', token)

      const es = new EventSource(url.href)
      es.addEventListener('message', (evt: MessageEvent) => observer.next(evt.data))
      es.addEventListener('error', evt => {
        close()
        observer.error(evt)
      })

      let cancelHeartbeatTimeout: (() => void) | null = null
      if (options.heartbeat ?? this.options.heartbeat) {
        const timeout = options.heartbeat.timeout ?? this.options.heartbeat.timeout
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

  /**
   * @throws {HeartbeatTimeoutError} from Observable
   */
  subscribeJSON<T>(
    namespace: string
  , options?: IPubSubClientObserveOptions
  ): Observable<T> {
    return this.subscribe(namespace, options).pipe(
      map(x => JSON.parse(x))
    )
  }
}

export class HeartbeatTimeoutError extends CustomError {}
