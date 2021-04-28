import { server } from './publish.mock'
import { PubSubClient } from '@src/pubsub-client'
import { TOKEN } from '@test/utils'
import '@blackglory/jest-matchers'

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

    const result = client.publish(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
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

    const result = client.publishJSON(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new PubSubClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
