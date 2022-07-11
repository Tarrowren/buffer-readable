import { Readable, ReadableOptions } from "stream";

export class BufferReadable extends Readable {
  #buffer: Buffer | null;
  #bufferLength: number;
  #delay = 0;
  #pos = 0;

  constructor(
    buffer: string | Buffer | Uint8Array,
    opts?: BufferReadableOptions
  ) {
    super(opts);

    if (Buffer.isBuffer(buffer)) {
      this.#buffer = buffer;
    } else if (typeof buffer === "string" || buffer instanceof Uint8Array) {
      this.#buffer = Buffer.from(buffer);
    } else {
      throw new Error("arguments type error");
    }

    this.#bufferLength = this.#buffer.length;

    const delay = opts?.delay;
    if (delay && Number.isSafeInteger(delay) && delay > 0) {
      this.#delay = delay;
    }
  }

  _read(size: number): void {
    if (!this.#buffer) {
      return;
    }

    if (this.#pos >= this.#bufferLength) {
      this.push(null);
    } else {
      const start = this.#pos;
      const end = start + size;
      const chunk = this.#buffer.slice(start, end);

      this.#pos = end;

      setTimeout(() => {
        this.push(chunk);
      }, this.#delay);
    }
  }

  _destroy(
    error: Error | null,
    callback: (error?: Error | null) => void
  ): void {
    this.#buffer = null;

    callback(error);
  }
}

export interface BufferReadableOptions
  extends Omit<ReadableOptions, "objectMode"> {
  delay?: number;
}
