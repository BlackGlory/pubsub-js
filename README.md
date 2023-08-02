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
  keepalive?: boolean
  timeout?: number | false
}

interface IPubSubClientSubscribeOptions {
  heartbeat?: IHeartbeatOptions
}

interface IHeartbeatOptions {
  timeout: number
}

class PubSubClient {
  constructor(options: IPubSubClientOptions)

  publish(
    namespace: string
  , channel: string
  , content: JSONValue
  , options?: IPubSubClientRequestOptions
  ): Promise<void>

  subscribe(
    namespace: string
  , channel: string
  , options?: IPubSubClientSubscribeOptions
  ): AsyncIterableIterator<string>
}
```
