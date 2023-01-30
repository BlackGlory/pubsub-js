# pubsub-js
## Install
```sh
npm install --save @blackglory/pubsub-js
# or
yarn add @blackglory/pubsub-js
```

## API
### PubSubClient
```ts
interface IPubSubClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  heartbeat?: IHeartbeatOptions
  timeout?: number
}

interface IPubSubClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

interface IPubSubClientObserveOptions {
  token?: string
  heartbeat?: IHeartbeatOptions
}

interface IHeartbeatOptions {
  timeout: number
}

class PubSubClient {
  constructor(options: IPubSubClientOptions)

  publish(
    namespace: string
  , val: string
  , options: IPubSubClientRequestOptions = {}
  ): Promise<void>

  publishJSON<T>(
    namespace: string
  , val: T
  , options?: IPubSubClientRequestOptions
  ): Promise<void>

  subscribe(
    namespace: string
  , options: IPubSubClientObserveOptions = {}
  ): Observable<string>

  subscribeJSON<T>(
    namespace: string
  , options?: IPubSubClientObserveOptions
  ): Observable<T>
}

class HeartbeatTimeoutError extends CustomError {}
```

### PubSubManager
```ts
interface IPubSubManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

interface IPubSubManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

class PubSubManager {
  constructor(options: IPubSubManagerOptions)

  JsonSchema: JsonSchemaManager
  Blacklist: BlacklistManager
  Whitelist: WhitelistManager
  TokenPolicy: TokenPolicyManager
  Token: TokenManager
}
```

#### JsonSchemaManager
```ts
class JsonSchemaManager {
  getNamespaces(options: IPubSubManagerRequestOptions = {}): Promise<string[]>
  get(namespace: string, options: IPubSubManagerRequestOptions = {}): Promise<unknown>
  set(
    namespace: string
  , schema: JSONValue
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void>
  remove(namespace: string, options: IPubSubManagerRequestOptions = {}): Promise<void>
}
```

#### BlacklistManager
```ts
class BlacklistManager {
  getNamespaces(options: IPubSubManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IPubSubManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IPubSubManagerRequestOptions = {}): Promise<void>
}
```

#### WhitelistManager
```ts
class WhitelistManager {
  getNamespaces(options: IPubSubManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IPubSubManagerRequestOptions = {}): Promise<void>
  remove(
    namespace: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void>
}
```

#### TokenPolicyManager
```ts
interface ITokenPolicy {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
}

class TokenPolicyManager {
  getNamespaces(options: IPubSubManagerRequestOptions = {}): Promise<string[]>
  get(
    namespace: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<ITokenPolicy>
  setWriteTokenRequired(
    namespace: string
  , val: boolean
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void>
  removeWriteTokenRequired(
    namespace: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void>
  setReadTokenRequired(
    namespace: string
  , val: boolean
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void>
  removeReadTokenRequired(
    namespace: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void>
}
```

#### TokenManager
```ts
interface ITokenInfo {
  token: string
  write: boolean
  read: boolean
}

class TokenManager {
  getNamespaces(options: IPubSubManagerRequestOptions = {}): Promise<string[]>
  getTokens(
    namespace: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<ITokenInfo[]>
  addWriteToken(
    namespace: string
  , token: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void>
  removeWriteToken(
    namespace: string
  , token: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void>
  addReadToken(
    namespace: string
  , token: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void>
  removeReadToken(
    namespace: string
  , token: string
  , options: IPubSubManagerRequestOptions = {}
  ): Promise<void>
}
```
