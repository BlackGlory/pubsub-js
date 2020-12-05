import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badAuth, badJson } from '@test/utils'

export const server = setupServer(
  rest.get('/api/pubsub-with-json-schema', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.get('/api/pubsub/:id/json-schema', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json({})
    )
  })

, rest.put('/api/pubsub/:id/json-schema', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/api/pubsub/:id/json-schema', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
