import { Readable, ReadableOptions } from "stream";

export class BufferReadable extends Readable {
  private __buffer: Buffer;
  private __buffer_len: number;
  private __delay = 0;
  private __pos = 0;

  constructor(
    buffer: string | Buffer | Uint8Array,
    opts?: BufferReadableOptions
  ) {
    super({ ...opts, objectMode: false });

    if (Buffer.isBuffer(buffer)) {
      this.__buffer = buffer;
    } else if (typeof buffer === "string" || buffer instanceof Uint8Array) {
      this.__buffer = Buffer.from(buffer);
    } else {
      throw new Error("arguments type error");
    }

    this.__buffer_len = this.__buffer.length;

    const delay = opts?.delay;
    if (typeof delay === "number" && Number.isSafeInteger(delay) && delay > 0) {
      this.__delay = delay;
    }
  }

  _read(size: number): void {
    if (this.__pos >= this.__buffer_len) {
      this.push(null);
    } else {
      const start = this.__pos;
      const end = start + size;
      const chunk = this.__buffer.slice(start, end);

      this.__pos = end;

      setTimeout(() => {
        this.push(chunk);

        if (end >= this.__buffer_len) {
          this.push(null);
        }
      }, this.__delay);
    }
  }

  _destroy(
    error: Error | null,
    callback: (error?: Error | null) => void
  ): void {
    this.__buffer = null as any;

    callback(error);
  }
}

export interface BufferReadableOptions
  extends Omit<ReadableOptions, "objectMode"> {
  delay?: number;
}
