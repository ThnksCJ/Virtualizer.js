import MovInstNode from "../instructions/memory/MovInstNode";
import AddInstNode from "../instructions/arithmetic/AddInstNode";
import SubInstNode from "../instructions/arithmetic/SubInstNode";
import DivInstNode from "../instructions/arithmetic/DivInstNode";
import MulInstNode from "../instructions/arithmetic/MulInstNode";
import PushInstNode from "../instructions/memory/PushInstNode";
import PopInstNode from "../instructions/memory/PopInstNode";
import GotoInstNode from "../instructions/system/GotoInstNode";
import JumpInstNode from "../instructions/system/JumpInstNode";
import EqInstNode from "../instructions/comparisons/EqInstNode";
import GtInstNode from "../instructions/comparisons/GtInstNode";
import LtInstNode from "../instructions/comparisons/LtInstNode";
import PrintInstNode from "../instructions/system/PrintInstNode";
import InstNode from "../instructions/InstNode";
import {logger} from "../global";

export default class VirtualMachine {
    private locals: Record<string, number>;
    private stack: any[];
    private instructionPointer: number;

    constructor() {
        this.locals = {};
        this.stack = [];
        this.instructionPointer = 0;
    }

    async execute(instructions: InstNode[]) {
        while (this.instructionPointer < instructions.length) {
            const instruction = instructions[this.instructionPointer];

            logger.virt.debug(`Executing instruction: ${instruction.prettyName}(${instruction.opcode})`);

            switch (instruction.opcode) {
                case MovInstNode.opcode:
                    const movInstruction = instruction as MovInstNode;
                    this.locals[movInstruction.variable] = movInstruction.value;
                    break;
                case AddInstNode.opcode:
                    const addVal1 = this.stack.pop();
                    const addVal2 = this.stack.pop();
                    this.stack.push(addVal1 + addVal2);
                    break;
                case SubInstNode.opcode:
                    const subVal1 = this.stack.pop();
                    const subVal2 = this.stack.pop();
                    this.stack.push(subVal2 - subVal1);
                    break;
                case MulInstNode.opcode:
                    this.stack.push(this.stack.pop() * this.stack.pop());
                    break;
                case DivInstNode.opcode:
                    const divisor = this.stack.pop();
                    this.stack.push(this.stack.pop() / divisor);
                    break;
                case PushInstNode.opcode:
                    const pushInstruction = instruction as PushInstNode;
                    this.stack.push(pushInstruction.variable ? this.locals[pushInstruction.variable] : pushInstruction.value);
                    break;
                case PopInstNode.opcode:
                    const popInstruction = instruction as PopInstNode;
                    this.locals[popInstruction.variable] = this.stack.pop();
                    break;
                case GotoInstNode.opcode:
                    const gotoInstruction = instruction as GotoInstNode;
                    this.instructionPointer = gotoInstruction.address - 1;
                    break;
                case JumpInstNode.opcode:
                    const jumpInstruction = instruction as JumpInstNode;
                    const condition = this.stack.pop();
                    this.instructionPointer = condition ? jumpInstruction.trueBranch - 1 : jumpInstruction.falseBranch - 1;
                    break;
                case EqInstNode.opcode:
                    this.stack.push(this.stack.pop() === this.stack.pop());
                    break;
                case GtInstNode.opcode:
                    const greaterVal1 = this.stack.pop();
                    const greaterVal2 = this.stack.pop();
                    this.stack.push(greaterVal2 > greaterVal1);
                    break;
                case LtInstNode.opcode:
                    const lesserVal1 = this.stack.pop();
                    const lesserVal2 = this.stack.pop();
                    this.stack.push(lesserVal2 < lesserVal1);
                    break;
                case PrintInstNode.opcode:
                    const printInstruction = instruction as PrintInstNode;
                    const output = this.locals[printInstruction.variable] || this.stack[this.stack.length - 1];
                    logger.virt.info(output);
                    break;
                default:
                    throw new Error("Unknown instruction: " + instruction.opcode);
            }

            this.instructionPointer++;
        }
    }
}