import { Interpreter } from "./core/Interpreter";
import interact from "./repl/Interact";

const interpreter = new Interpreter()
const interpret = (input: string) => interpreter.interpret(input)
const repl = interact(interpreter);

const Eru = { interpret, repl }
export default Eru;
