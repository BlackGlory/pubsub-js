import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const server = setupServer(
  rest.post('http://localhost/namespaces/:namespace/channels/:channel', (req, res, ctx) => {
    return res(ctx.status(204))
  })
)
