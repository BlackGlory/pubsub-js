import { fetch } from 'extra-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { IPubSubManagerOptions } from './pubsub-manager'
import { IPubSubManagerRequestOptions } from './types'

interface ITokenInfo {
  token: string
  write: boolean
  read: boolean
}

export class TokenClient {
  constructor(private options: IPubSubManagerOptions) {}

  async getIds(options: IPubSubManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/admin/pubsub-with-tokens')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getTokens(id: string, options: IPubSubManagerRequestOptions = {}): Promise<ITokenInfo[]> {
    const req = get(
      url(this.options.server)
    , pathname(`/admin/pubsub/${id}/tokens`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenInfo[]
  }

  async addWriteToken(id: string, token: string, options: IPubSubManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/pubsub/${id}/tokens/${token}/write`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeWriteToken(id: string, token: string, options: IPubSubManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/pubsub/${id}/tokens/${token}/write`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async addReadToken(id: string, token: string, options: IPubSubManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/pubsub/${id}/tokens/${token}/read`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeReadToken(id: string, token: string, options: IPubSubManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/pubsub/${id}/tokens/${token}/read`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
