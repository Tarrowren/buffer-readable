import should from "should";
import { BufferReadable } from ".";

describe("BufferReadable", () => {
  describe("arguments", () => {
    it("string", () => {
      const data = "hello";

      should.doesNotThrow(() => {
        const stream = new BufferReadable(data);
        stream.destroy();
      });
    });

    it("Buffer", () => {
      const data = Buffer.allocUnsafe(16);

      should.doesNotThrow(() => {
        const stream = new BufferReadable(data);
        stream.destroy();
      });
    });

    it("Uint8Array", () => {
      const data = new Uint8Array(16);

      should.doesNotThrow(() => {
        const stream = new BufferReadable(data);
        stream.destroy();
      });
    });

    it("error type", () => {
      const data: any = new Uint16Array(16);

      should.throws(() => {
        const stream = new BufferReadable(data);
        stream.destroy();
      });
    });
  });

  it("highWaterMark", async () => {
    const highWaterMark = 2;
    const stream = new BufferReadable("hello", {
      delay: 10,
      highWaterMark,
    });

    for await (const chunk of stream) {
      should(chunk.length).lessThanOrEqual(highWaterMark);
    }
  });
});
