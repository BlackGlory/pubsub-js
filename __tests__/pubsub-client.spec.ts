import { JSONValue } from '@blackglory/prelude'
import { buildServer } from './pubsub-client.mock.js'
import { PubSubClient } from '@src/pubsub-client.js'
import { delay } from 'extra-promise'
import { firstAsync } from 'iterable-operator'
import { getAddress, startService, stopService } from './utils.js'

beforeAll(() => startService(buildServer))
afterAll(stopService)

describe('PubSubClient', () => {
  test('publish', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const channel = 'channel'
    const content = 'content'

    await client.publish(namespace, channel, content)
  })

  describe('subscribe', () => {
    test('general', async () => {
      const namespace = 'namespace'
      const channel = 'channel'
      const client = createClient()

      const result = await firstAsync(client.subscribe(namespace, channel))

      expect(result).toBe('content')
    })

    // 此处的心跳检测测试通过客户端超时来模拟服务器超时, 这是因为msw不支持模拟服务器超时.
    describe('heartbeat', () => {
      test('timeout', async () => {
        const namespace = 'namespace'
        const channel = 'channel'
        const client = createClient()
        const iter = client.subscribe(namespace, channel, {
          heartbeat: { timeout: 500 }
        })

        const results: JSONValue[] = []
        for await (const message of iter) {
          results.push(message)
          if (results.length === 2) break
          await delay(600)
        }

        expect(results).toStrictEqual([
          'content'
        , 'content'
        ])
      })

      test('no timeout', async () => {
        const namespace = 'namespace'
        const channel = 'channel'
        const client = createClient()
        const iter = client.subscribe(namespace, channel, {
          heartbeat: { timeout: 500 }
        })

        const results: JSONValue[] = []
        for await (const message of iter) {
          results.push(message)
          if (results.length === 2) break
          await delay(400)
        }

        expect(results).toStrictEqual([
          'content'
        , 'content'
        ])
      })
    })
  })
})

function createClient() {
  return new PubSubClient({ server: getAddress() })
}
