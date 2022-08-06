import { expect } from "chai";
import { BufferReadable } from ".";

describe("BufferReadable", () => {
  describe("arguments", () => {
    it("string", () => {
      const data = "hello";

      expect(() => {
        const stream = new BufferReadable(data);
        stream.destroy();
      }).not.throw();
    });

    it("Buffer", () => {
      const data = Buffer.allocUnsafe(16);

      expect(() => {
        const stream = new BufferReadable(data);
        stream.destroy();
      }).not.throw();
    });

    it("Uint8Array", () => {
      const data = new Uint8Array(16);

      expect(() => {
        const stream = new BufferReadable(data);
        stream.destroy();
      }).not.throw();
    });

    it("error type", () => {
      const data: any = new Uint16Array(16);

      expect(() => {
        const stream = new BufferReadable(data);
        stream.destroy();
      }).throw();
    });
  });

  it("highWaterMark", async () => {
    const highWaterMark = 2;
    const stream = new BufferReadable("hello", {
      delay: 10,
      highWaterMark,
    });

    for await (const chunk of stream) {
      expect(chunk.length).lte(highWaterMark);
    }
  });
});
