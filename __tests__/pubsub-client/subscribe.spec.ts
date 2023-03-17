import { PubSubClient } from '@src/pubsub-client.js'
import { Observable } from 'rxjs'
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
  test('subscribe', async () => {
    const namespace = 'namespace'
    const channel = 'channel'
    const client = createClient()

    const observable = client.observe(namespace, channel)
    const data = await new Promise<string>(resolve => observable.subscribe(resolve))

    expect(data).toBe('data')
    expect(observable).toBeInstanceOf(Observable)
  })
})

function createClient() {
  return new PubSubClient({ server: 'http://localhost' })
}
