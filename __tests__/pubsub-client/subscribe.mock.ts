import { MockEvent } from 'mocksse'
import { TOKEN } from '@test/utils'

const id = 'id'
new MockEvent({
  url: `http://localhost/pubsub/${id}?token=${TOKEN}`
, responses: [
    { type: 'message', data: 'null' }
  ]
})
