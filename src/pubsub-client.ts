import { fetch } from 'extra-fetch'
import { post, IRequestOptionsTransformer, get } from 'extra-request'
import { url, appendPathname, json, keepalive, signal, basicAuth, header } from 'extra-request/transformers'
import { ok } from 'extra-response'
import { setTimeout } from 'extra-timers'
import { AbortError, raceAbortSignals, timeoutSignal } from 'extra-abort'
import { assert, Falsy, JSONValue, go, isntUndefined, pass } from '@blackglory/prelude'
import { expectedVersion } from './contract.js'
import { fetchEvents } from 'extra-sse'

export interface IPubSubClientOptions {
  server: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  heartbeat?: IHeartbeatOptions
  timeout?: number
}

export interface IPubSubClientRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export interface IPubSubClientSubscribeOptions extends IPubSubClientRequestOptions {
  heartbeat?: IHeartbeatOptions
}

export interface IHeartbeatOptions {
  timeout: number
}

export class PubSubClient {
  constructor(private options: IPubSubClientOptions) {}

  /**
   * @throws {AbortError}
   */
  async publish(
    namespace: string
  , channel: string
  , content: JSONValue
  , options: IPubSubClientRequestOptions = {}
  ): Promise<void> {
    const req = post(
      ...this.getCommonTransformers(options)
    , appendPathname(`/namespaces/${namespace}/channels/${channel}`)
    , json(content)
    )

    await fetch(req).then(ok)
  }

  async * subscribe(
    namespace: string
  , channel: string
  , options: IPubSubClientSubscribeOptions = {}
  ): AsyncIterableIterator<JSONValue> {
    const heartbeatTimeout = go(() => {
      const timeout = options.heartbeat?.timeout ?? this.options.heartbeat?.timeout
      if (isntUndefined(timeout)) {
        assert(Number.isInteger(timeout), 'heartbeat.timeout must be an integer')
        assert(timeout > 0, 'heartbeat.timeout must greater than zero')
      }

      return timeout
    })
    let cancelHeartbeatTimeout: (() => void) | undefined

    while (true) {
      try {
        const controller = new AbortController()
        for await (
          const { event = 'message', data } of fetchEvents(
            () => get(
              ...this.getCommonTransformers({
                ...options
              , signal: raceAbortSignals([
                  options.signal
                , controller.signal
                ])
              })
            , appendPathname(`/namespaces/${namespace}/channels/${channel}`)
            )
          , {
              onOpen: () => {
                if (isntUndefined(heartbeatTimeout)) {
                  resetHeartbeatTimeout(controller, heartbeatTimeout)
                }
              }
            }
          )
        ) {
          switch (event) {
            case 'message': {
              if (isntUndefined(data)) {
                yield JSON.parse(data)
              }
              break
            }
            case 'heartbeat': {
              if (isntUndefined(heartbeatTimeout)) {
                resetHeartbeatTimeout(controller, heartbeatTimeout)
              }
              break
            }
          }
        }
      } catch (e) {
        if (e instanceof AbortError) {
          pass()
        } else {
          throw e
        }
      } finally {
        cancelHeartbeatTimeout?.()
      }
    }

    function resetHeartbeatTimeout(controller: AbortController, timeout: number): void {
      cancelHeartbeatTimeout?.()
      cancelHeartbeatTimeout = setTimeout(timeout, () => controller.abort())
    }
  }

  private getCommonTransformers(
    options: IPubSubClientRequestOptions
  ): Array<IRequestOptionsTransformer | Falsy> {
    const auth = this.options.basicAuth

    return [
      url(this.options.server)
    , auth && basicAuth(auth.username, auth.password)
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , (options.keepalive ?? this.options.keepalive) && keepalive()
    , header('Accept-Version', expectedVersion)
    ]
  }
}
