import { fetch } from 'extra-fetch'
import { Json } from 'justypes'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IPubSubManagerRequestOptions, Base } from './base'

export class JsonSchemaManager extends Base {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IPubSubManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/pubsub-with-json-schema')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async get(namespace: string, options: IPubSubManagerRequestOptions = {}): Promise<unknown> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/pubsub/${namespace}/json-schema`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON)
  }

  /**
   * @throws {AbortError}
   */
  async set(
    namespace: string
  , schema: Json
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/pubsub/${namespace}/json-schema`)
    , json(schema)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async remove(namespace: string, options: IPubSubManagerRequestOptions = {}): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/pubsub/${namespace}/json-schema`)
    )

    await fetch(req).then(ok)
  }
}
