import { fetch } from 'extra-fetch'
import { post } from 'extra-request'
import { url, pathname, text, searchParams } from 'extra-request/lib/es2018/transformers'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ok } from 'extra-response'
import 'eventsource/lib/eventsource-polyfill'

export interface PubSubClientOptions {
  server: string
  token?: string
}

export interface PubSubClientRequestOptions {
  signal?: AbortSignal
  token?: string
}

export interface PubSubClientObserveOptions {
  token?: string
}

export class PubSubClient {
  constructor(private options: PubSubClientOptions) {}

  async publish(id: string, val: string, options: PubSubClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token

    const req = post(
      url(this.options.server)
    , pathname(`pubsub/${id}`)
    , token && searchParams({ token })
    , text(val)
    )

    await fetch(req).then(ok)
  }

  async publishJSON<T>(id: string, val: T, options?: PubSubClientRequestOptions): Promise<void> {
    return await this.publish(id, JSON.stringify(val), options)
  }

  subscribe(id: string, options: PubSubClientObserveOptions = {}): Observable<string> {
    return new Observable(observer => {
      const token = options.token ?? this.options.token
      const url = new URL(`/pubsub/${id}`, this.options.server)
      if (token) url.searchParams.append('token', token)

      const es = new EventSource(url.href)
      es.addEventListener('message', (evt: MessageEvent) => observer.next(evt.data))
      es.addEventListener('error', (evt: MessageEvent) => observer.error(evt))

      return () => es.close()
    })
  }

  subscribeJSON<T>(id: string, options?: PubSubClientObserveOptions): Observable<T> {
    return this.subscribe(id, options).pipe(
      map(x => JSON.parse(x))
    )
  }
}
