import { JsonSchemaClient } from './json-schema-client'
import { BlacklistClient } from './blacklist-client'
import { WhitelistClient } from './whitelist-client'
import { TokenPolicyClient } from './token-policy-client'
import { TokenClient } from './token-client'

export interface PubSubManagerOptions {
  server: string
  adminPassword: string
}

export class PubSubManager {
  constructor(private options: PubSubManagerOptions) {}

  JsonSchema = new JsonSchemaClient(this.options)
  Blacklist = new BlacklistClient(this.options)
  Whitelist = new WhitelistClient(this.options)
  TokenPolicy = new TokenPolicyClient(this.options)
  Token = new TokenClient(this.options)
}
