import { fetch } from 'extra-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { IPubSubManagerOptions } from './pubsub-manager'
import { IPubSubManagerRequestOptions } from './types'

interface ITokenPolicy {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
}

export class TokenPolicyClient {
  constructor(private options: IPubSubManagerOptions) {}

  async getIds(options: IPubSubManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/admin/pubsub-with-token-policies')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(id: string, options: IPubSubManagerRequestOptions = {}): Promise<ITokenPolicy> {
    const req = get(
      url(this.options.server)
    , pathname(`/admin/pubsub/${id}/token-policies`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenPolicy
  }

  async setWriteTokenRequired(id: string, val: boolean, options: IPubSubManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/pubsub/${id}/token-policies/write-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeWriteTokenRequired(id: string, options: IPubSubManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/pubsub/${id}/token-policies/write-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setReadTokenRequired(id: string, val: boolean, options: IPubSubManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/pubsub/${id}/token-policies/read-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeReadTokenRequired(id: string, options: IPubSubManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/pubsub/${id}/token-policies/read-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
