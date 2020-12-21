import { fetch } from 'cross-fetch'
import { post } from 'extra-request'
import { url, pathname, text, searchParams } from 'extra-request/lib/es2018/transformers'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import EventSource = require('eventsource')
import { ok } from 'extra-response'
import { Json } from '@blackglory/types'

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

  async publishJSON(id: string, val: Json, options?: PubSubClientRequestOptions): Promise<void> {
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

  subscribeJSON(id: string, options?: PubSubClientObserveOptions): Observable<Json> {
    return this.subscribe(id, options).pipe(
      map(x => JSON.parse(x))
    )
  }
}
