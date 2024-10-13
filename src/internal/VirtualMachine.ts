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
import AndInstNode from "../instructions/arithmetic/AndInstNode";
import ModInstNode from "../instructions/arithmetic/ModInstNode";
import OrInstNode from "../instructions/arithmetic/OrInstNode";
import XorInstNode from "../instructions/arithmetic/XorInstNode";

export default class VirtualMachine {
    private readonly locals: Record<string, number>;
    private readonly stack: any[];
    private instructionPointer: number;

    constructor() {
        this.locals = {};
        this.stack = [];
        this.instructionPointer = 0;
    }

    async execute(instructions: InstNode[]) {
        while (this.instructionPointer < instructions.length) {
            const instruction = instructions[this.instructionPointer];

            switch (instruction.opcode) {
                case MovInstNode.opcode:
                    const movInstruction = instruction as MovInstNode;
                    this.locals[movInstruction.variable] = movInstruction.value;
                    break;
                case AddInstNode.opcode:
                    const addVal1 = Number(this.stack.pop());
                    const addVal2 = Number(this.stack.pop());
                    this.stack.push(addVal1 + addVal2);
                    break;
                case SubInstNode.opcode:
                    const subVal1 = Number(this.stack.pop());
                    const subVal2 = Number(this.stack.pop());
                    this.stack.push(subVal2 - subVal1);
                    break;
                case MulInstNode.opcode:
                    this.stack.push(Number(this.stack.pop()) * this.stack.pop());
                    break;
                case DivInstNode.opcode:
                    const divisor = Number(this.stack.pop());
                    this.stack.push(Number(this.stack.pop()) / divisor);
                    break;
                case AndInstNode.opcode:
                    const andVal1 = Number(this.stack.pop());
                    const andVal2 = Number(this.stack.pop());
                    this.stack.push(andVal1 & andVal2);
                    break;
                case ModInstNode.opcode:
                    const modVal1 = Number(this.stack.pop());
                    const modVal2 = Number(this.stack.pop());
                    this.stack.push(modVal2 % modVal1);
                    break;
                case OrInstNode.opcode:
                    this.stack.push(this.stack.pop() | this.stack.pop());
                    break;
                case XorInstNode.opcode:
                    const xorVal1 = this.stack.pop();
                    const xorVal2 = this.stack.pop();
                    this.stack.push(xorVal1 ^ xorVal2);
                    break;
                case PushInstNode.opcode:
                    const pushInstruction = instruction as PushInstNode;
                    this.stack.push(this.locals[pushInstruction.value] || pushInstruction.value);
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