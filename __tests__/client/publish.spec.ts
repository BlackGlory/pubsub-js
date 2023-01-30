import { server } from './publish.mock.js'
import { PubSubClient } from '@src/client.js'
import { TOKEN } from '@test/utils.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('PubSubClient', () => {
  test(`
    publish(
      namespace: string
    , val: string
    , options?: { token?: string }
    ): Promise<void>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'
    const val = 'null'

    const result = await client.publish(namespace, val)

    expect(result).toBeUndefined()
  })

  test(`
    publishJSON(
      namespace: string
    , val: Json
    , options?: { token?: string }
    ): Promise<void>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'
    const val = null

    const result = await client.publishJSON(namespace, val)

    expect(result).toBeUndefined()
  })
})

function createClient() {
  return new PubSubClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
