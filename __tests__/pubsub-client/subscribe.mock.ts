// @ts-ignore
import { MockEvent } from 'mocksse'

const namespace = 'namespace'
const channel = 'channel'
new MockEvent({
  url: `http://localhost/namespaces/${namespace}/channels/${channel}`
, responses: [
    { type: 'message', data: JSON.stringify('content') }
  ]
})
