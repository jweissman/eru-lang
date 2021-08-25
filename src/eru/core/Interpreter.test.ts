import interpret from "./Interpreter";

describe("Eru interpreter", () => {
  describe("arithmetic", () => {
    it("should compute simple sums", () => {
      expect(interpret('2+2')).toBe('4')
      expect(interpret('2+3')).toBe('5')
      expect(interpret('4+3')).toBe('7')
    });
  })
});
