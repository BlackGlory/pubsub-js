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
})
```

```ts
interface IPubSubClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
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
PubSubClient#publish(id: string, val: string, options?: IPubSubClientRequestOptions): Promise<void>
```

#### publishJSON

```ts
PubSubClient#publishJSON(id: string, val: Json, options?: IPubSubClientRequestOptions): Promise<void>
```

#### subscribe

```ts
PubSubClient#subscribe(id: string, options?: IPubSubClientObserveOptions): Observable<string>
```

#### subscribeJSON

```ts
PubSubClient#subscribeJSON(id: string, options?: IPubSubClientObserveOptions): Observable<Json>
```

### PubSubManager

```ts
new PubSubManager({
  server: string
, adminPassword: string
})
```

```ts
interface IPubSubManagerRequestOptions {
  signal?: AbortSignal
}
```

#### JsonSchema

##### getIds

```ts
PubSubManager#JsonSchema.getIds(options?: IPubSubManagerRequestOptions): Promise<string[]>
```

##### get

```ts
PubSubManager#JsonSchema.get(id: string, options?: IPubSubManagerRequestOptions): Promise<Json>
```

##### set

```ts
PubSubManager#JsonSchema.set(id: string, schema: Json, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### remove

```ts
PubSubManager#JsonSchema.remove(id: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

#### RevisionPolicy

##### getIds

```ts
PubSubManager#RevisionPolicy.getIds(options?: IPubSubManagerRequestOptions): Promise<string[]>
```

##### get

```ts
PubSubManager#RevisionPolicy.get(id: string, options?: IPubSubManagerRequestOptions): Promise<{
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}>
```

##### setUpdateRevisionRequired

```ts
PubSubManager#RevisionPolicy.setUpdateRevisionRequired(id: string, val: boolean, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### removeUpdateRevisionRequired

```ts
PubSubManager#RevisionPolicy.removeUpdateRevisionRequired(id: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### setDeleteRevisionRequired

```ts
PubSubManager#RevisionPolicy.setDeleteRevisionRequired(id: string, val: boolean, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### removeDeleteRevisionRequired

```ts
PubSubManager#RevisionPolicy.removeDeleteRevisionRequired(id: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

#### Blacklist

##### getIds

```ts
PubSubManager#Blacklist.getIds(options?: IPubSubManagerRequestOptions): Promise<string[]>
```

##### add

```ts
PubSubManager#Blacklist.add(id: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### remove

```ts
PubSubManager#Blacklist.remove(id: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

#### Whitelist

##### getIds

```ts
PubSubManager#Whitelist.getIds(options?: IPubSubManagerRequestOptions): Promise<string[]>
```

##### add

```ts
PubSubManager#Whitelist.add(id: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### remove

```ts
PubSubManager#Whitelist.remove(id: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
PubSubManager#TokenPolicy.getIds(options?: IPubSubManagerRequestOptions): Promise<string[]>
```

##### get

```ts
PubSubManager#TokenPolicy.get(id: string, options?: IPubSubManagerRequestOptions): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired

```ts
PubSubManager#TokenPolicy.setWriteTokenRequired(id: string, val: boolean, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### removeWriteTokenRequired

```ts
PubSubManager#TokenPolicy.removeWriteTokenRequired(id: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### setReadTokenRequired


```ts
PubSubManager#TokenPolicy.setReadTokenRequired(id: string, val: boolean, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### removeReadTokenRequired

```ts
PubSubManager#TokenPolicy.removeReadTokenRequired(id: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

#### Token

##### getIds

```ts
PubSubManager#Token.getIds(options?: IPubSubManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
PubSubManager#Token.getTokens(id: string, options?: IPubSubManagerRequestOptions): Promise<Array<{
  token: string
  write: boolean
  read: boolean
}>>
```

##### addWriteToken

```ts
PubSubManager#Token.addWriteToken(id: string, token: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### removeWriteToken

```ts
PubSubManager#Token.removeWriteToken(id: string, token: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### addReadToken

```ts
PubSubManager#Token.addReadToken(id: string, token: string, options?: IPubSubManagerRequestOptions): Promise<void>
```

##### removeReadToken

```ts
PubSubManager#Token.removeReadToken(id: string, token: string, options?: IPubSubManagerRequestOptions): Promise<void>
```
