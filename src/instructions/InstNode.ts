/**
 * Represents an instruction node.

 * @constructor
 * @param opcode - The opcode of the instruction.
 * @param prettyName - The pretty name of the instruction.
 *
 * @see Interpreter#tokenize
 * @see VirtualMachine#execute
 */
class InstNode {
    private readonly _opcode: number;
    private readonly _prettyName: string;

    constructor(opcode: number, prettyName: string) {
        this._opcode = opcode;
        this._prettyName = prettyName;
    }

    get opcode(): number {
        return this._opcode;
    }

    get prettyName(): string {
        return this._prettyName;
    }
}

export default InstNode;