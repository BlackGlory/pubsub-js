import { fetch, EventSource } from 'extra-fetch'
import { post } from 'extra-request'
import { url, pathname, text, searchParams, keepalive } from 'extra-request/lib/es2018/transformers'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ok } from 'extra-response'
import { assert } from '@blackglory/errors'

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
  probes: number // probe count
}

export class PubSubClient {
  constructor(private options: IPubSubClientOptions) {}

  async publish(id: string, val: string, options: IPubSubClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token

    const req = post(
      url(this.options.server)
    , pathname(`pubsub/${id}`)
    , token && searchParams({ token })
    , text(val)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async publishJSON<T>(id: string, val: T, options?: IPubSubClientRequestOptions): Promise<void> {
    return await this.publish(id, JSON.stringify(val), options)
  }

  subscribe(id: string, options: IPubSubClientObserveOptions = {}): Observable<string> {
    return new Observable(observer => {
      const token = options.token ?? this.options.token
      const url = new URL(`/pubsub/${id}`, this.options.server)
      if (token) url.searchParams.append('token', token)

      const es = new EventSource(url.href)
      es.addEventListener('message', (evt: MessageEvent) => observer.next(evt.data))
      es.addEventListener('error', evt => {
        close()
        observer.error(evt)
      })

      let heartbeatTimer: ReturnType<typeof setInterval> | null = null
      if (options.heartbeat ?? this.options.heartbeat) {
        const timeout = options.heartbeat.timeout ?? this.options.heartbeat.timeout
        const probes = options.heartbeat.probes ?? this.options.heartbeat.probes
        assert(Number.isInteger(probes), 'probes must be an integer')
        assert(probes > 0, 'probes must greater than zero')
        let lastHeartbeat = Date.now()
        heartbeatTimer = setInterval(() => {
          if (Date.now() - lastHeartbeat > timeout * (probes + 1)) {
            close()
            observer.error(new HeartbeatTimeoutError())
          }
        }, options.heartbeat.timeout)

        es.addEventListener('heartbeat', () => lastHeartbeat = Date.now())
      }

      return close

      function close() {
        if (heartbeatTimer) clearInterval(heartbeatTimer)
        es.close()
      }
    })
  }

  subscribeJSON<T>(id: string, options?: IPubSubClientObserveOptions): Observable<T> {
    return this.subscribe(id, options).pipe(
      map(x => JSON.parse(x))
    )
  }
}

export class HeartbeatTimeoutError {}
