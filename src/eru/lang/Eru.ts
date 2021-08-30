import ohm, { grammar } from 'ohm-js';
import { readFileSync } from 'fs';

const g = grammar(readFileSync('./src/eru/lang/Eru.ohm').toString());
const semantics = g.createSemantics()


export { g as grammar, semantics };
// const match = g.match('1 + (2 - 3) + 4');
// assert.equal(semantics(match).eval(), 4);
