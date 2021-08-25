import { grammar, semantics } from "../lang/Eru";

class EruObject {
  get inspect() { return '(EruObject)'; }
}

class EruNull extends EruObject {
  get inspect() { return '(null)'; }
}

class EruInt extends EruObject {
  constructor(private value: number) {
    super();
  }
  get inspect() { return String(this.value); }
}

class EruInterpreter {
  interpret(input: string): string {
    return this.evaluate(input).inspect
  }

  evaluate(input: string): EruObject {
    const match = grammar.match(input)
    const value = semantics(match).eval()
    return new EruInt(value)
  }
}

const interpreter = new EruInterpreter()
const interpret = (input: string) => interpreter.interpret(input)
export default interpret;
