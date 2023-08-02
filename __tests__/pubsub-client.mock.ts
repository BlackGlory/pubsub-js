import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { stringifyEvent } from 'extra-sse'
import { toArray, concat } from 'iterable-operator'

export const server = setupServer(
  rest.post(
    'http://localhost/namespaces/:namespace/channels/:channel'
  , async (req, res, ctx) => {
      expect(req.params.namespace).toBe('namespace')
      expect(req.params.channel).toBe('channel')
      expect(await req.json()).toStrictEqual('content')

      return res(ctx.status(204))
    }
  )

, rest.get(
    'http://localhost/namespaces/:namespace/channels/:channel'
  , (req, res, ctx) => {
      expect(req.params.namespace).toBe('namespace')
      expect(req.params.channel).toBe('channel')

      return res(
        ctx.status(200)
      , ctx.set('Connection', 'keep-alive')
      , ctx.set('Content-Type', 'text/event-stream')
      , ctx.body(toArray(concat(
          stringifyEvent({ data: JSON.stringify('content') })
        , stringifyEvent({ event: 'heartbeat' })
        )).join(''))
      )
    }
  )
)
