import { PubSubClient } from '@src/pubsub-client'
import { Observable } from 'rxjs'
import { TOKEN } from '@test/utils'
import './subscribe.mock'

jest.mock('eventsource', () => require('mocksse').EventSource)

describe('PubSubClient', () => {
  it('subscribe(id: string, options?: { token?: string }): Observable<string>', async done => {
    const id = 'id'
    const client = createClient()

    const observable = client.subscribe(id)
    observable.subscribe(data => {
      expect(data).toBe('message')
      done()
    })

    expect(observable).toBeInstanceOf(Observable)
  })
})

function createClient() {
  return new PubSubClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
