import chalk from 'chalk';
import { Interpreter } from '../core/Interpreter';
const clear = require('clear');
const figlet = require('figlet');
const repl = require('repl');

const say = (msg: string) => console.log("\n" + (msg))
const trace = (msg: string) => say(chalk.cyan(msg))
const debug = (msg: string) => say(chalk.gray(msg))
const info = (msg: string) => say(chalk.blue(msg))
const warn = (msg: string) => say(chalk.white(msg))

const setup = () => {
  clear();
  info(chalk.blue(figlet.textSync('ea!')));
  console.log("\n" + chalk.blue("Eru") + chalk.cyan("Programming") + chalk.white("Language"));
  // todo any interpreter setup tasks...?
}

const replize = (interpreter: Interpreter) => {
  repl.start({
    prompt: chalk.gray(' > '),
    // preview: true, // think this uses node intepreter
    eval: (input: string, _ctx: any, _file: any, cb: any) => cb(null, interpreter.evaluate(input))
  })
}

const interact = (interpreter: Interpreter) => () => {
  setup()
  warn('Welcome to ea (interactive Eru interpeter)!')
  replize(interpreter)
}

export default interact;
