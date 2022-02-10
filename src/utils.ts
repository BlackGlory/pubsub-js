import { IHTTPOptionsTransformer } from 'extra-request'
import { url, signal, keepalive, bearerAuth, header } from 'extra-request/transformers/index.js'
import { timeoutSignal, raceAbortSignals } from 'extra-abort'
import type { IPubSubManagerOptions } from './pubsub-manager'

export interface IPubSubManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export const expectedVersion = '1.1.0'

export class PubSubManagerBase {
  constructor(private options: IPubSubManagerOptions) {}

  protected getCommonTransformers(
    options: IPubSubManagerRequestOptions
  ): IHTTPOptionsTransformer[] {
    return [
      url(this.options.server)
    , bearerAuth(this.options.adminPassword)
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , keepalive(options.keepalive ?? this.options.keepalive)
    , header('Accept-Version', expectedVersion)
    ]
  }
}
