import { server } from './publish.mock.js'
import { PubSubClient } from '@src/pubsub-client.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('PubSubClient', () => {
  test('publish', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const channel = 'channel'
    const value = 'data'

    const result = await client.publish(namespace, channel, value)

    expect(result).toBeUndefined()
  })
})

function createClient() {
  return new PubSubClient({ server: 'http://localhost' })
}
