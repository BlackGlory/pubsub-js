import { fastify } from 'fastify'
import { stringifyEvent } from 'extra-sse'
import { toArray, concat } from 'iterable-operator'

export function buildServer() {
  const server = fastify()

  server.post<{
    Params: {
      namespace: string
      channel: string
    }
    Body: string
  }>('/namespaces/:namespace/channels/:channel', async req => {
    expect(req.params.namespace).toBe('namespace')
    expect(req.params.channel).toBe('channel')
    expect(req.body).toStrictEqual('content')

    return new Response(null, { status: 204 })
  })

  server.get<{
    Params: {
      namespace: string
      channel: string
    }
  }>('/namespaces/:namespace/channels/:channel', req => {
    expect(req.params.namespace).toBe('namespace')
    expect(req.params.channel).toBe('channel')

    return new Response(
      toArray(concat(
        stringifyEvent({ data: JSON.stringify('content') })
      , stringifyEvent({ event: 'heartbeat' })
      )).join('')
    , {
        status: 200
      , headers: {
          'Connection': 'keep-alive'
        , 'Content-Type': 'text/event-stream'
        }
      }
    )
  })

  return server
}
