import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const server = setupServer(
  rest.get(
    `http://localhost/namespaces/namespace/channels/channel`
  , async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.set('Connection', 'keep-alive'),
        ctx.set('Content-Type', 'text/event-stream'),
        ctx.body(`data: ${JSON.stringify('content')}\n\n`)
      )
    }
  )
)
