export class EruObject { get inspect() { return '(EruObject)'; } }
export class EruNull extends EruObject { get inspect() { return '(null)'; } }
export class EruInt extends EruObject {
  constructor(public value: number) {
    super();
  }
  get inspect() { return String(this.value); }
}

export interface VM {
  iplus: () => void;
  isub: () => void;
}

// op, args
export type Instruction = [string, Array<string>?]
export class Arda implements VM {
  private frame: { stack: Array<EruObject>; } = { stack: [] };
  protected popTwo<T extends EruObject>(): [ T, T ] {
    let right: EruInt = this.frame.stack.pop() as EruInt;
    let left: EruInt = this.frame.stack.pop() as EruInt;
    return [left as unknown as T, right as unknown as T]
  }

  iplus() {
    const [left, right] = this.popTwo<EruInt>();
    let result = left.value + right.value;
    this.frame.stack.push(new EruInt(result));
  }

  isub() {
    const [left, right] = this.popTwo<EruInt>();
    let result = left.value - right.value;
    this.frame.stack.push(new EruInt(result));
  }

  imul() {
    const [left, right] = this.popTwo<EruInt>();
    let result = left.value * right.value;
    this.frame.stack.push(new EruInt(result));
  }

  idiv() {
    const [left, right] = this.popTwo<EruInt>();
    let result = left.value / right.value;
    this.frame.stack.push(new EruInt(result));
  }

  executeOne(instruction: Instruction): EruObject {
    const [method, args] = instruction;
    // console.log("Arda.executeOne", { instruction })
    let returnTop = true;
    switch (method) {
      case 'ipush': args && args.forEach(arg => {
        this.frame.stack.push(new EruInt(parseInt(arg, 10)));
      }); break;
      case 'iplus': this.iplus(); break;
      case 'isub': this.isub(); break;
      case 'imul': this.imul(); break;
      case 'idiv': this.idiv(); break;
      case 'print': args && args.forEach(arg => console.log(arg)); returnTop = false; break;
      default: throw new Error("EruInterpreter: Method not implemented -- " + method);
    }
    return returnTop ? this.frame.stack[this.frame.stack.length - 1] : new EruNull();
  }
}
