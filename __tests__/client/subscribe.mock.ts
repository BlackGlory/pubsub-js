// @ts-ignore
import { MockEvent } from 'mocksse'
import { TOKEN } from '@test/utils.js'

const namespace = 'namespace'
new MockEvent({
  url: `http://localhost/pubsub/${namespace}?token=${TOKEN}`
, responses: [
    { type: 'message', data: 'null' }
  ]
})
