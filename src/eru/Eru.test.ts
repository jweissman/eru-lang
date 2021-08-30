import Eru from ".";
describe("The Eru Programming Language", () => {
  const { interpret: evaluate } = Eru;
  describe("The Basics", () => {
    describe("Integer Arithmetic", () => {
      it("should compute sums and differences", () => {
        expect(evaluate('2+2')).toBe('4')
        expect(evaluate('2+3')).toBe('5')
        expect(evaluate('4+3')).toBe('7')
        expect(evaluate('4-3')).toBe('1')
        expect(evaluate('2-2')).toBe('0')
      });
  
      it("should multiply and divide", () => {
        expect(evaluate('2*2')).toBe('4')
        expect(evaluate('2*3')).toBe('6')
        expect(evaluate('4*3')).toBe('12')
        expect(evaluate('4/3')).toBe('1.3333333333333333')
        expect(evaluate('2/2')).toBe('1')
      });
  
      it("should order operations", () => {
        expect(evaluate('2*3+3')).toBe('9')
        expect(evaluate('2*(3+3)')).toBe('12')
        expect(evaluate('3+3*2')).toBe('9')
        expect(evaluate('(3+3)*2')).toBe('12')
      });

      it('negative values', () => {
        expect(evaluate('5+-3')).toBe('2')
        expect(evaluate('-10 + 20')).toBe('10')
      })
    })

    xdescribe("String Manipulation", () => {
      it("should concatenate strings", () => {
        expect(evaluate('"hello" + " " + "world"')).toEqual("'hello world'")
      })
    })

    describe("Boolean Algebra", () => {
      it('should define boolean values', () => {
        expect(evaluate("true")).toEqual('true')
        expect(evaluate("false")).toEqual('false')
      })

      describe('should define boolean operations', () => {
        it('and', () => {
          expect(evaluate("true && true")).toEqual('true')
          expect(evaluate("true && false")).toEqual('false')
          expect(evaluate("false && true")).toEqual('false')
          expect(evaluate("false && false")).toEqual('false')
        })

        it('or', () => {
          expect(evaluate("true || true")).toEqual('true')
          expect(evaluate("true || false")).toEqual('true')
          expect(evaluate("false || true")).toEqual('true')
          expect(evaluate("false || false")).toEqual('false')
        })

        it('not', () => {
          expect(evaluate("!true")).toEqual('false')
          expect(evaluate("!false")).toEqual('true')
          expect(evaluate("!!false")).toEqual('false')
          expect(evaluate("!!true")).toEqual('true')
          expect(evaluate("!!!true")).toEqual('false')
          expect(evaluate("!!!false")).toEqual('true')
        })
        it('composes', () => {
          expect(evaluate("!(false || true)")).toEqual('false')
          expect(evaluate("!!(false || true)")).toEqual('true')
          expect(evaluate("!(false && true)")).toEqual('true')
          expect(evaluate("!!(false && true)")).toEqual('false')
        })
      })
    })
  })
});
