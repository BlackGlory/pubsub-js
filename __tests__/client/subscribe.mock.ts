import { MockEvent } from 'mocksse'
import { TOKEN } from '@test/utils'

const namespace = 'namespace'
new MockEvent({
  url: `http://localhost/pubsub/${namespace}?token=${TOKEN}`
, responses: [
    { type: 'message', data: 'null' }
  ]
})
