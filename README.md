# buffer-readable

convert a string/Buffer/Uint8Array to a readable stream, support highWaterMark and adjustable push delay

## Install

```sh
npm i buffer-readable
```

## Example

```js
import { BufferReadable } from "buffer-readable";

const stream = new BufferReadable("hello", { highWaterMark: 1, delay: 1000 });

for await (const chunk of stream) {
  // do sth
}
```

## API

### Class BufferReadable

```ts
new BufferReadable(buffer: string | Uint8Array | Buffer, opts?: BufferReadableOptions): BufferReadable
```

- `buffer`: string | Uint8Array | Buffer
- `opts` (Optional) : BufferReadableOptions

### Interface BufferReadableOptions

- `delay` (Optional) : number

  Delayed push, in milliseconds

## License

MIT
