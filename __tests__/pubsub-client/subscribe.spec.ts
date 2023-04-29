import { server } from './subscribe.mock.js'
import { PubSubClient } from '@src/pubsub-client.js'
import { Observable, firstValueFrom } from 'rxjs'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

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
