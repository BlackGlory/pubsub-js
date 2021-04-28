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

  async getNamespaces(options: IPubSubManagerRequestOptions = {}): Promise<string[]> {
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

  async get(
    namespace: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<ITokenPolicy> {
    const req = get(
      url(this.options.server)
    , pathname(`/admin/pubsub/${namespace}/token-policies`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenPolicy
  }

  async setWriteTokenRequired(
    namespace: string
  , val: boolean
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/pubsub/${namespace}/token-policies/write-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeWriteTokenRequired(
    namespace: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/pubsub/${namespace}/token-policies/write-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setReadTokenRequired(
    namespace: string
  , val: boolean
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/pubsub/${namespace}/token-policies/read-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeReadTokenRequired(
    namespace: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/pubsub/${namespace}/token-policies/read-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
