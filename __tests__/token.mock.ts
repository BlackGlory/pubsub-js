import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badAuth } from '@test/utils'

export const server = setupServer(
  rest.get('/api/pubsub-with-tokens', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(200), ctx.json(['id']))
  })

, rest.get('/api/pubsub/:id/tokens', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json([
        {
          token: 'token'
        , write: true
        , read: false
        }
      ])
    )
  })

, rest.put('/api/pubsub/:id/tokens/:token/write', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/api/pubsub/:id/tokens/:token/write', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/api/pubsub/:id/tokens/:token/read', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/api/pubsub/:id/tokens/:token/read', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
