#!/usr/bin/env ts-node
import Eru from '../src/eru'

const args = process.argv.slice(2);
if (args.length === 0) {
    Eru.repl();
} else {
    const fs = require('fs');
    const contents = fs.readFileSync(args[0]).toString();
    Eru.interpret(contents);
}
