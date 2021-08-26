import { BinaryExpression, Expression, grammar, IntegerLiteral, semantics } from "../lang/Eru";
import { Arda, EruNull, EruObject, Instruction } from "../vm/Arda";

type Code = Array<Instruction>

class Interpreter {
  private vm: Arda = new Arda()
  interpret(input: string): string {
    return this.evaluate(input).inspect
  }

  evaluate(input: string): EruObject {
    const match = grammar.match(input)
    const ast = semantics(match).tree()
    const program = this.codegen(ast)
    const result = this.execute(program)
    return result
  }

  execute(program: Code): EruObject {
    // console.log('EruIntepreter.execute', { program })
    let _ = new EruNull();
    program.forEach(instruction => _ = this.vm.executeOne(instruction))
    return _;
  }


  commandsForBinaryOps: { [op: string]: string } = {
    '+': 'iplus',
    '-': 'isub',
    '*': 'imul',
    '/': 'idiv'
  }
  private codegen(ast: Expression): Code {
    if (ast instanceof BinaryExpression) {
      const command = this.commandsForBinaryOps[ast.op]
      if (command) {
        const operatorCode: Instruction = [command] //, []]
        return [
          ...this.codegen(ast.left),
          ...this.codegen(ast.right),
          operatorCode,
        ]
      } else {
        throw new Error("EruInterpreter.codegen: binary operator not supported " + ast.op)
      }
    } else if (ast instanceof IntegerLiteral) {
      return [[ 'ipush', [String(ast.value)] ]]
    } else {
      throw new Error("EruInterpreter.codegen: not implemented for " + ast.constructor.name)
    }
  }
}

const interpreter = new Interpreter()
const interpret = (input: string) => interpreter.interpret(input)
export default interpret;
