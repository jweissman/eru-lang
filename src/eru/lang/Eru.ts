import ohm, { grammar } from 'ohm-js';
import { readFileSync } from 'fs';

const Eru = grammar(readFileSync('./src/eru/lang/Eru.ohm').toString());

type BinaryOperator = '+' | '-' | '*' | '/' | '||' | '&&'
export class Expression { }
export class IntegerLiteral extends Expression { constructor(public value: number) { super(); } }
export class BooleanLiteral extends Expression { constructor(public value: boolean) { super(); } }
export class BinaryExpression extends Expression {
  constructor(public left: Expression, public op: BinaryOperator, public right: Expression) {
    super();
  }
}

const binExpr = (op: BinaryOperator, left: ohm.Node, right: ohm.Node) => 
  new BinaryExpression(left.tree(), op, right.tree())

const telperion = Eru.createSemantics().addOperation('tree', {
  Exp(e) { return e.tree() },
  AddExp(e) { return e.tree(); },
  AddExp_plus(left, _plus, right)   { return binExpr('+', left, right) },
  AddExp_minus(left, _minus, right) { return binExpr('-', left, right) },
  MulExp_mult(left, _times, right)   { return binExpr('*', left, right) },
  MulExp_div(left, _div, right)   { return binExpr('/', left, right) },
  LogExp_and(left, _and, right)   { return binExpr('&&', left, right) },
  LogExp_or(left, _or, right)   { return binExpr('||', left, right) },
  // LogExp_not(_not_, value) { }
  PriExp(e) {
    return e.tree();
  },
  PriExp_paren(_open, exp, _close) {
    return exp.tree();
  },
  number(chars) {
    return new IntegerLiteral(parseInt(this.sourceString as unknown as string, 10));
  },
  bool(boolean) {
    return new BooleanLiteral(boolean.sourceString === 'true')
  }
})

// Create an operation that evaluates the expression. An operation always belongs to a Semantics,
// which is a family of related operations and attributes for a particular grammar.
// const evaluate = Eru.createSemantics().addOperation('eval', {
//   Exp(e) {
//     return e.eval();
//   },
//   AddExp(e) {
//     return e.eval();
//   },
//   AddExp_plus(left, op, right) {
//     return left.eval() + right.eval();
//   },
//   AddExp_minus(left, op, right) {
//     return left.eval() - right.eval();
//   },
//   PriExp(e) {
//     return e.eval();
//   },
//   PriExp_paren(open, exp, close) {
//     return exp.eval();
//   },
//   number(chars) {
//     return parseInt(this.sourceString, 10);
//   }
// });

export { Eru as grammar, telperion as semantics };
// const match = g.match('1 + (2 - 3) + 4');
// assert.equal(semantics(match).eval(), 4);
