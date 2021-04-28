import { fetch, EventSource } from 'extra-fetch'
import { post } from 'extra-request'
import { url, pathname, text, searchParams, keepalive } from 'extra-request/lib/es2018/transformers'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ok } from 'extra-response'
import { assert, CustomError } from '@blackglory/errors'
import { setTimeout } from 'extra-timers'

export { HTTPClientError } from '@blackglory/http-status'

export interface IPubSubClientOptions {
  server: string
  token?: string
  keepalive?: boolean
  heartbeat?: IHeartbeatOptions
}

export interface IPubSubClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
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

  async publish(
    namespace: string
  , val: string
  , options: IPubSubClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token

    const req = post(
      url(this.options.server)
    , pathname(`pubsub/${namespace}`)
    , token && searchParams({ token })
    , text(val)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

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
