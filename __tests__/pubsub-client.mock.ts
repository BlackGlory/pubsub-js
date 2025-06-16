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
  }>('/namespaces/:namespace/channels/:channel', async request => {
    expect(request.params.namespace).toBe('namespace')
    expect(request.params.channel).toBe('channel')
    expect(request.body).toStrictEqual('content')

    return new Response(null, { status: 204 })
  })

  server.get<{
    Params: {
      namespace: string
      channel: string
    }
  }>('/namespaces/:namespace/channels/:channel', ({ params }) => {
    expect(params.namespace).toBe('namespace')
    expect(params.channel).toBe('channel')

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
