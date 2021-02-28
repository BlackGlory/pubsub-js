import { fetch, EventSource } from 'extra-fetch'
import { post } from 'extra-request'
import { url, pathname, text, searchParams } from 'extra-request/lib/es2018/transformers'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ok } from 'extra-response'

export interface IPubSubClientOptions {
  server: string
  token?: string
}

export interface IPubSubClientRequestOptions {
  signal?: AbortSignal
  token?: string
}

export interface IPubSubClientObserveOptions {
  token?: string
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
      es.addEventListener('error', (evt: MessageEvent) => observer.error(evt))

      return () => es.close()
    })
  }

  subscribeJSON<T>(id: string, options?: IPubSubClientObserveOptions): Observable<T> {
    return this.subscribe(id, options).pipe(
      map(x => JSON.parse(x))
    )
  }
}
