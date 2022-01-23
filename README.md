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
new PubSubClient{
  server: string
, token?: string
, keepalive?: boolean
, heartbeat?: IHeartbeatOptions
, timeout?: number
})
```

```ts
interface IPubSubClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}
```

```ts
interface IPubSubClientObserveOptions {
  token?: string
  heartbeat?: IHeartbeatOptions
}
```

```ts
interface IHeartbeatOptions {
  timeout: number
}
```

#### publish
```ts
PubSubClient#publish(
  namespace: string
, val: string
, options?: IPubSubClientRequestOptions
): Promise<void>
```

#### publishJSON
```ts
PubSubClient#publishJSON(
  namespace: string
, val: Json
, options?: IPubSubClientRequestOptions
): Promise<void>
```

#### subscribe
```ts
PubSubClient#subscribe(
  namespace: string
, options?: IPubSubClientObserveOptions
): Observable<string>
```

#### subscribeJSON
```ts
PubSubClient#subscribeJSON(
  namespace: string
, options?: IPubSubClientObserveOptions
): Observable<Json>
```

### PubSubManager
```ts
new PubSubManager({
  server: string
, adminPassword: string
, keepalive?: boolean
, timeout?: number
})
```

```ts
interface IPubSubManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}
```

#### JsonSchema
##### getNamespaces
```ts
PubSubManager#JsonSchema.getNamespaces(
  options?: IPubSubManagerRequestOptions
): Promise<string[]>
```

##### get
```ts
PubSubManager#JsonSchema.get(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<Json>
```

##### set
```ts
PubSubManager#JsonSchema.set(
  namespace: string
, schema: Json
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### remove
```ts
PubSubManager#JsonSchema.remove(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

#### RevisionPolicy
##### getNamespaces
```ts
PubSubManager#RevisionPolicy.getNamespaces(
  options?: IPubSubManagerRequestOptions
): Promise<string[]>
```

##### get
```ts
PubSubManager#RevisionPolicy.get(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<{
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}>
```

##### setUpdateRevisionRequired
```ts
PubSubManager#RevisionPolicy.setUpdateRevisionRequired(
  namespace: string
, val: boolean
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### removeUpdateRevisionRequired
```ts
PubSubManager#RevisionPolicy.removeUpdateRevisionRequired(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### setDeleteRevisionRequired
```ts
PubSubManager#RevisionPolicy.setDeleteRevisionRequired(
  namespace: string
, val: boolean
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### removeDeleteRevisionRequired
```ts
PubSubManager#RevisionPolicy.removeDeleteRevisionRequired(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

#### Blacklist
##### getNamespaces
```ts
PubSubManager#Blacklist.getNamespaces(
  options?: IPubSubManagerRequestOptions
): Promise<string[]>
```

##### add
```ts
PubSubManager#Blacklist.add(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### remove
```ts
PubSubManager#Blacklist.remove(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

#### Whitelist
##### getNamespaces
```ts
PubSubManager#Whitelist.getNamespaces(
  options?: IPubSubManagerRequestOptions
): Promise<string[]>
```

##### add
```ts
PubSubManager#Whitelist.add(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### remove
```ts
PubSubManager#Whitelist.remove(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

#### TokenPolicy
##### getNamespaces
```ts
PubSubManager#TokenPolicy.getNamespaces(
  options?: IPubSubManagerRequestOptions
): Promise<string[]>
```

##### get
```ts
PubSubManager#TokenPolicy.get(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired
```ts
PubSubManager#TokenPolicy.setWriteTokenRequired(
  namespace: string
, val: boolean
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### removeWriteTokenRequired
```ts
PubSubManager#TokenPolicy.removeWriteTokenRequired(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### setReadTokenRequired
```ts
PubSubManager#TokenPolicy.setReadTokenRequired(
  namespace: string
, val: boolean
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### removeReadTokenRequired
```ts
PubSubManager#TokenPolicy.removeReadTokenRequired(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

#### Token
##### getNamespaces
```ts
PubSubManager#Token.getNamespaces(
  options?: IPubSubManagerRequestOptions
): Promise<string[]>
```

##### getTokens
```ts
PubSubManager#Token.getTokens(
  namespace: string
, options?: IPubSubManagerRequestOptions
): Promise<Array<{
  token: string
  write: boolean
  read: boolean
}>>
```

##### addWriteToken
```ts
PubSubManager#Token.addWriteToken(
  namespace: string
, token: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### removeWriteToken
```ts
PubSubManager#Token.removeWriteToken(
  namespace: string
, token: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### addReadToken
```ts
PubSubManager#Token.addReadToken(
  namespace: string
, token: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```

##### removeReadToken
```ts
PubSubManager#Token.removeReadToken(
  namespace: string
, token: string
, options?: IPubSubManagerRequestOptions
): Promise<void>
```
