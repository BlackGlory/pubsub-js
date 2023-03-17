import { PubSubClient } from '@src/pubsub-client.js'
import { Observable, firstValueFrom } from 'rxjs'
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
    const result = await firstValueFrom(observable)

    expect(result).toBe('content')
    expect(observable).toBeInstanceOf(Observable)
  })
})

function createClient() {
  return new PubSubClient({ server: 'http://localhost' })
}
