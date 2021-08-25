import { grammar } from 'ohm-js';
import { readFileSync } from 'fs';

const g = grammar(readFileSync('./src/eru/lang/Eru.ohm').toString()); // as unknown as string);

// Create an operation that evaluates the expression. An operation always belongs to a Semantics,
// which is a family of related operations and attributes for a particular grammar.
const semantics = g.createSemantics().addOperation('eval', {
  Exp(e) {
    return e.eval();
  },
  AddExp(e) {
    return e.eval();
  },
  AddExp_plus(left, op, right) {
    return left.eval() + right.eval();
  },
  AddExp_minus(left, op, right) {
    return left.eval() - right.eval();
  },
  PriExp(e) {
    return e.eval();
  },
  PriExp_paren(open, exp, close) {
    return exp.eval();
  },
  number(chars) {
    return parseInt(this.sourceString, 10);
  }
});

export { g as grammar, semantics };
// const match = g.match('1 + (2 - 3) + 4');
// assert.equal(semantics(match).eval(), 4);
