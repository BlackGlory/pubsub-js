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
new PubSubClient({
  server: string
, token?: string
})
```

```ts
interface PubSubClientRequestOptions {
  signal?: AbortSignal
  token?: string
}
```

```ts
interface PubSubClientObserveOptions {
  token?: string
}
```

#### publish

```ts
PubSubClient#publish(id: string, val: string, options?: PubSubClientRequestOptions): Promise<void>
```

#### publishJSON

```ts
PubSubClient#publishJSON(id: string, val: Json, options?: PubSubClientRequestOptions): Promise<void>
```

#### subscribe

```ts
PubSubClient#subscribe(id: string, options?: PubSubClientObserveOptions): Observable<string>
```

#### subscribeJSON

```ts
PubSubClient#subscribeJSON(id: string, options?: PubSubClientObserveOptions): Observable<Json>
```

### PubSubManager

```ts
new PubSubManager({
  server: string
, adminPassword: string
})
```

```ts
interface PubSubManagerRequestOptions {
  signal?: AbortSignal
}
```

#### JsonSchema

##### getIds

```ts
PubSubManager#JsonSchema.getIds(options?: PubSubManagerRequestOptions): Promise<string[]>
```

##### get

```ts
PubSubManager#JsonSchema.get(id: string, options?: PubSubManagerRequestOptions): Promise<Json>
```

##### set

```ts
PubSubManager#JsonSchema.set(id: string, schema: Json, options?: PubSubManagerRequestOptions): Promise<void>
```

##### remove

```ts
PubSubManager#JsonSchema.remove(id: string, options?: PubSubManagerRequestOptions): Promise<void>
```

#### RevisionPolicy

##### getIds

```ts
PubSubManager#RevisionPolicy.getIds(options?: PubSubManagerRequestOptions): Promise<string[]>
```

##### get

```ts
PubSubManager#RevisionPolicy.get(id: string, options?: PubSubManagerRequestOptions): Promise<{
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}>
```

##### setUpdateRevisionRequired

```ts
PubSubManager#RevisionPolicy.setUpdateRevisionRequired(id: string, val: boolean, options?: PubSubManagerRequestOptions): Promise<void>
```

##### removeUpdateRevisionRequired

```ts
PubSubManager#RevisionPolicy.removeUpdateRevisionRequired(id: string, options?: PubSubManagerRequestOptions): Promise<void>
```

##### setDeleteRevisionRequired

```ts
PubSubManager#RevisionPolicy.setDeleteRevisionRequired(id: string, val: boolean, options?: PubSubManagerRequestOptions): Promise<void>
```

##### removeDeleteRevisionRequired

```ts
PubSubManager#RevisionPolicy.removeDeleteRevisionRequired(id: string, options?: PubSubManagerRequestOptions): Promise<void>
```

#### Blacklist

##### getIds

```ts
PubSubManager#Blacklist.getIds(options?: PubSubManagerRequestOptions): Promise<string[]>
```

##### add

```ts
PubSubManager#Blacklist.add(id: string, options?: PubSubManagerRequestOptions): Promise<void>
```

##### remove

```ts
PubSubManager#Blacklist.remove(id: string, options?: PubSubManagerRequestOptions): Promise<void>
```

#### Whitelist

##### getIds

```ts
PubSubManager#Whitelist.getIds(options?: PubSubManagerRequestOptions): Promise<string[]>
```

##### add

```ts
PubSubManager#Whitelist.add(id: string, options?: PubSubManagerRequestOptions): Promise<void>
```

##### remove

```ts
PubSubManager#Whitelist.remove(id: string, options?: PubSubManagerRequestOptions): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
PubSubManager#TokenPolicy.getIds(options?: PubSubManagerRequestOptions): Promise<string[]>
```

##### get

```ts
PubSubManager#TokenPolicy.get(id: string, options?: PubSubManagerRequestOptions): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired

```ts
PubSubManager#TokenPolicy.setWriteTokenRequired(id: string, val: boolean, options?: PubSubManagerRequestOptions): Promise<void>
```

##### removeWriteTokenRequired

```ts
PubSubManager#TokenPolicy.removeWriteTokenRequired(id: string, options?: PubSubManagerRequestOptions): Promise<void>
```

##### setReadTokenRequired


```ts
PubSubManager#TokenPolicy.setReadTokenRequired(id: string, val: boolean, options?: PubSubManagerRequestOptions): Promise<void>
```

##### removeReadTokenRequired

```ts
PubSubManager#TokenPolicy.removeReadTokenRequired(id: string, options?: PubSubManagerRequestOptions): Promise<void>
```

#### Token

##### getIds

```ts
PubSubManager#Token.getIds(options?: PubSubManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
PubSubManager#Token.getTokens(id: string, options?: PubSubManagerRequestOptions): Promise<Array<{
  token: string
  write: boolean
  read: boolean
}>>
```

##### addWriteToken

```ts
PubSubManager#Token.addWriteToken(id: string, token: string, options?: PubSubManagerRequestOptions): Promise<void>
```

##### removeWriteToken

```ts
PubSubManager#Token.removeWriteToken(id: string, token: string, options?: PubSubManagerRequestOptions): Promise<void>
```

##### addReadToken

```ts
PubSubManager#Token.addReadToken(id: string, token: string, options?: PubSubManagerRequestOptions): Promise<void>
```

##### removeReadToken

```ts
PubSubManager#Token.removeReadToken(id: string, token: string, options?: PubSubManagerRequestOptions): Promise<void>
```
