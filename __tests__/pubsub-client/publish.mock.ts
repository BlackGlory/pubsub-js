import { setupServer } from 'msw/node'
import { rest } from 'msw'

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
)
