import { fetch } from 'cross-fetch'
import { checkHTTPStatus } from './utils'
import { post } from 'extra-request'
import { url, pathname, text, searchParams } from 'extra-request/lib/es2018/transformers'
import { Observable } from 'rxjs'
import EventSource = require('eventsource')

export interface PubSubClientOptions {
  server: string
  token?: string
}

export class PubSubClient {
  constructor(private options: PubSubClientOptions) {}

  async publish(id: string, val: string, options: { token?: string } = {}): Promise<void> {
    const token = options.token ?? this.options.token

    const req = post(
      url(this.options.server)
    , pathname(`pubsub/${id}`)
    , token && searchParams({ token })
    , text(val)
    )

    await fetch(req)
      .then(checkHTTPStatus)
  }

  createObservable(id: string, options: { token?: string } = {}): Observable<string> {
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
}
