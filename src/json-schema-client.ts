import { fetch } from 'extra-fetch'
import { Json } from '@blackglory/types'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { PubSubManagerOptions } from './pubsub-manager'
import { PubSubManagerRequestOptions } from './types'

export class JsonSchemaClient {
  constructor(private options: PubSubManagerOptions) {}

  async getIds(options: PubSubManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/pubsub-with-json-schema')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(id: string, options: PubSubManagerRequestOptions = {}): Promise<unknown> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/pubsub/${id}/json-schema`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON)
  }

  async set(id: string, schema: Json, options: PubSubManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/pubsub/${id}/json-schema`)
    , password(this.options.adminPassword)
    , json(schema)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async remove(id: string, options: PubSubManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/pubsub/${id}/json-schema`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
