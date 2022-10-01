import { PubSubClient } from '@src/client'
import { Observable } from 'rxjs'
import { TOKEN } from '@test/utils'
import './subscribe.mock'

jest.mock('eventsource', () => require('mocksse').EventSource)

describe('PubSubClient', () => {
  test(`
    subscribe(
      namespace: string
    , options?: { token?: string }
    ): Observable<string>
  `, done => {
    const namespace = 'namespace'
    const client = createClient()

    const observable = client.subscribe(namespace)
    observable.subscribe(data => {
      expect(data).toBe('null')
      done()
    })

    expect(observable).toBeInstanceOf(Observable)
  })

  test(`
    subscribeJSON(
      namespace: string
    , options?: { token?: string }
    ): Observable<Json>
  `, done => {
    const namespace = 'namespace'
    const client = createClient()

    const observable = client.subscribeJSON(namespace)
    observable.subscribe(data => {
      expect(data).toBe(null)
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
