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

#### publish

```ts
PubSubClient#publish(id: string, val: string, options?: { token?: string }): Promise<void>
```

#### publishJSON

```ts
PubSubClient#publishJSON(id: string, val: Json, options?: { token?: string }): Promise<void>
```

#### subscribe

```ts
PubSubClient#subscribe(id: string, options?: { token?: string }): Observable<string>
```

#### subscribeJSON

```ts
PubSubClient#subscribeJSON(id: string, options?: { token?: string }): Observable<Json>
```

### PubSubManager

```ts
new PubSubManager({
  server: string
, adminPassword: string
})
```

#### JsonSchema

##### getIds

```ts
PubSubManager#JsonSchema.getIds(): Promise<string[]>
```

##### get

```ts
PubSubManager#JsonSchema.get(id: string): Promise<Json>
```

##### set

```ts
PubSubManager#JsonSchema.set(id: string, schema: Json): Promise<void>
```

##### remove

```ts
PubSubManager#JsonSchema.remove(id: string): Promise<void>
```

#### RevisionPolicy

##### getIds

```ts
PubSubManager#RevisionPolicy.getIds(): Promise<string[]>
```

##### get

```ts
PubSubManager#RevisionPolicy.get(id: string): Promise<{
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}>
```

##### setUpdateRevisionRequired

```ts
PubSubManager#RevisionPolicy.setUpdateRevisionRequired(id: string, val: boolean): Promise<void>
```

##### removeUpdateRevisionRequired

```ts
PubSubManager#RevisionPolicy.removeUpdateRevisionRequired(id: string): Promise<void>
```

##### setDeleteRevisionRequired

```ts
PubSubManager#RevisionPolicy.setDeleteRevisionRequired(id: string, val: boolean): Promise<void>
```

##### removeDeleteRevisionRequired

```ts
PubSubManager#RevisionPolicy.removeDeleteRevisionRequired(id: string): Promise<void>
```

#### Blacklist

##### getIds

```ts
PubSubManager#Blacklist.getIds(): Promise<string[]>
```

##### add

```ts
PubSubManager#Blacklist.add(id: string): Promise<void>
```

##### remove

```ts
PubSubManager#Blacklist.remove(id: string): Promise<void>
```

#### Whitelist

##### getIds

```ts
PubSubManager#Whitelist.getIds(): Promise<string[]>
```

##### add

```ts
PubSubManager#Whitelist.add(id: string): Promise<void>
```

##### remove

```ts
PubSubManager#Whitelist.remove(id: string): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
PubSubManager#TokenPolicy.getIds(): Promise<string[]>
```

##### get

```ts
PubSubManager#TokenPolicy.get(id: string): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired

```ts
PubSubManager#TokenPolicy.setWriteTokenRequired(id: string, val: boolean): Promise<void>
```

##### removeWriteTokenRequired

```ts
PubSubManager#TokenPolicy.removeWriteTokenRequired(id: string): Promise<void>
```

##### setReadTokenRequired


```ts
PubSubManager#TokenPolicy.setReadTokenRequired(id: string, val: boolean): Promise<void>
```

##### removeReadTokenRequired

```ts
PubSubManager#TokenPolicy.removeReadTokenRequired(id: string): Promise<void>
```

#### Token

##### getIds

```ts
PubSubManager#Token.getIds(): Promise<string[]>
```

##### getTokens

```ts
PubSubManager#Token.getTokens(id: string): Promise<Array<{
  token: string
  write: boolean
  read: boolean
}>>
```

##### addWriteToken

```ts
PubSubManager#Token.addWriteToken(id: string, token: string): Promise<void>
```

##### removeWriteToken

```ts
PubSubManager#Token.removeWriteToken(id: string, token: string): Promise<void>
```

##### addReadToken

```ts
PubSubManager#Token.addReadToken(id: string, token: string): Promise<void>
```

##### removeReadToken

```ts
PubSubManager#Token.removeReadToken(id: string, token: string): Promise<void>
```
