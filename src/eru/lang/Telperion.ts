import ohm from "ohm-js";
import { grammar, semantics } from "./Eru";

type UnaryOperator = '!' | '-'
type BinaryOperator = '+' | '-' | '*' | '/' | '||' | '&&'

export class Expression { }
export class IntegerLiteral extends Expression { constructor(public value: number) { super(); } }
export class BooleanLiteral extends Expression { constructor(public value: boolean) { super(); } }
export class BinaryExpression extends Expression {
  constructor(public left: Expression, public op: BinaryOperator, public right: Expression) { super(); }
}
export class UnaryExpression extends Expression {
  constructor(public one: Expression, public op: UnaryOperator) { super(); }
}

const binExpr = (op: BinaryOperator, left: ohm.Node, right: ohm.Node) => 
  new BinaryExpression(left.tree(), op, right.tree())
const unExpr = (op: UnaryOperator, one: ohm.Node) =>
  new UnaryExpression(one.tree(), op)

const telperion = semantics.addOperation('tree', {
  Exp(e) { return e.tree() },
  AddExp(e) { return e.tree(); },
  AddExp_plus(left, _plus, right)   { return binExpr('+', left, right) },
  AddExp_minus(left, _minus, right) { return binExpr('-', left, right) },
  MulExp_mult(left, _times, right)  { return binExpr('*', left, right) },
  MulExp_div(left, _div, right)   { return binExpr('/', left, right) },
  LogExp_and(left, _and, right)   { return binExpr('&&', left, right) },
  LogExp_or(left, _or, right)     { return binExpr('||', left, right) },
  LogExp_not(_not_, one) { return unExpr('!', one)},
  PriExp(e) { return e.tree(); },
  PriExp_paren(_open, exp, _close) { return exp.tree(); },
  PriExp_neg(_neg, exp) { return unExpr('-', exp); },
  number(chars) { return new IntegerLiteral(parseInt(this.sourceString as unknown as string, 10)); },
  bool(boolean) { return new BooleanLiteral(boolean.sourceString === 'true') }
})
export default telperion;
