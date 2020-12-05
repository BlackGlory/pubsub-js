import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badToken } from '@test/utils'

export const server = setupServer(
  rest.post('/pubsub/:id', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
