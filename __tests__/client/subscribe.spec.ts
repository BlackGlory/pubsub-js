import { PubSubClient } from '@src/client.js'
import { Observable } from 'rxjs'
import { TOKEN } from '@test/utils.js'
import './subscribe.mock.js'

vi.mock('extra-fetch', () => {
  const actual = vi.importActual('extra-fetch')
  const EventSource = require('mocksse').EventSource
  return {
    ...actual
  , EventSource
  }
})


describe('PubSubClient', () => {
  test(`
    subscribe(
      namespace: string
    , options?: { token?: string }
    ): Observable<string>
  `, async () => {
    const namespace = 'namespace'
    const client = createClient()

    const observable = client.subscribe(namespace)
    const data = await new Promise<string>(resolve => observable.subscribe(resolve))

    expect(data).toBe('null')
    expect(observable).toBeInstanceOf(Observable)
  })

  test(`
    subscribeJSON(
      namespace: string
    , options?: { token?: string }
    ): Observable<Json>
  `, async () => {
    const namespace = 'namespace'
    const client = createClient()

    const observable = client.subscribeJSON(namespace)
    const data = await new Promise<unknown>(resolve => observable.subscribe(resolve))

    expect(data).toBe(null)
    expect(observable).toBeInstanceOf(Observable)
  })
})

function createClient() {
  return new PubSubClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
