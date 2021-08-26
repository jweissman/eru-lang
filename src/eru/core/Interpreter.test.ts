import interpret from "./Interpreter";

describe("Eru interpreter", () => {
  describe("arithmetic", () => {
    it("should compute sums and differences", () => {
      expect(interpret('2+2')).toBe('4')
      expect(interpret('2+3')).toBe('5')
      expect(interpret('4+3')).toBe('7')
      expect(interpret('4-3')).toBe('1')
      expect(interpret('2-2')).toBe('0')
    });

    it("should multiply and divide", () => {
      expect(interpret('2*2')).toBe('4')
      expect(interpret('2*3')).toBe('6')
      expect(interpret('4*3')).toBe('12')
      expect(interpret('4/3')).toBe('1.3333333333333333')
      expect(interpret('2/2')).toBe('1')
    });
  })
});
