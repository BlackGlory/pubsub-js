import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IPubSubManagerRequestOptions, PubSubManagerBase } from './utils'

interface ITokenInfo {
  token: string
  write: boolean
  read: boolean
}

export class TokenClient extends PubSubManagerBase {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IPubSubManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/pubsub-with-tokens')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async getTokens(
    namespace: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<ITokenInfo[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/pubsub/${namespace}/tokens`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenInfo[]
  }

  /**
   * @throws {AbortError}
   */
  async addWriteToken(
    namespace: string
  , token: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/pubsub/${namespace}/tokens/${token}/write`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeWriteToken(
    namespace: string
  , token: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/pubsub/${namespace}/tokens/${token}/write`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async addReadToken(
    namespace: string
  , token: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/pubsub/${namespace}/tokens/${token}/read`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeReadToken(
    namespace: string
  , token: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/pubsub/${namespace}/tokens/${token}/read`)
    )

    await fetch(req).then(ok)
  }
}
