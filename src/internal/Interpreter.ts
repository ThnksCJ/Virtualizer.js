import AddInstNode from "../instructions/arithmetic/AddInstNode";
import SubInstNode from "../instructions/arithmetic/SubInstNode";
import DivInstNode from "../instructions/arithmetic/DivInstNode";
import MulInstNode from "../instructions/arithmetic/MulInstNode";
import AndInstNode from "../instructions/arithmetic/AndInstNode";
import ModInstNode from "../instructions/arithmetic/ModInstNode";
import OrInstNode from "../instructions/arithmetic/OrInstNode";
import XorInstNode from "../instructions/arithmetic/XorInstNode";

import MovInstNode from "../instructions/memory/MovInstNode";
import PushInstNode from "../instructions/memory/PushInstNode";
import PopInstNode from "../instructions/memory/PopInstNode";

import GotoInstNode from "../instructions/system/GotoInstNode";
import JumpInstNode from "../instructions/system/JumpInstNode";
import PrintInstNode from "../instructions/system/PrintInstNode";

import EqInstNode from "../instructions/comparisons/EqInstNode";
import GtInstNode from "../instructions/comparisons/GtInstNode";
import LtInstNode from "../instructions/comparisons/LtInstNode";

import InstNode from "../instructions/InstNode";

/**
 * Interpreter class that preprocesses, tokenizes, and interprets the input into an array of instructions
 * that can be executed by the VM.
 */
export default class Interpreter {
    /**
     * Removes comments and empty lines from the input.
     * @param input The raw input string.
     * @returns Cleaned input without comments and empty lines.
     */
    preprocess(input: string): string {
        return input
            .split('\n')
            .map(line => line.split(';')[0].trim())
            .filter(line => line.length > 0)
            .join('\n');
    }

    /**
     * Tokenizes the input string into an array of instructions.
     * @param input The raw input string.
     * @returns An array of {@link InstNode} instructions.
     */
    tokenize(input: string): InstNode[] {
        const program: InstNode[] = [];
        const lines = this.preprocess(input).split('\n');

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith(';')) continue;

            const [op, ...args] = trimmedLine.split(' ');
            let instruction: InstNode;

            switch (op) {
                case MovInstNode.prettyName:
                    if (args.length !== 2) throw new Error(`Invalid number of arguments for ${op}`);

                    instruction = new MovInstNode(args[0], parseInt(args[1]));
                    break;
                case AddInstNode.prettyName:
                    instruction = new AddInstNode();
                    break;
                case SubInstNode.prettyName:
                    instruction = new SubInstNode();
                    break;
                case MulInstNode.prettyName:
                    instruction = new MulInstNode();
                    break;
                case DivInstNode.prettyName:
                    instruction = new DivInstNode();
                    break;
                case AndInstNode.prettyName:
                    instruction = new AndInstNode();
                    break;
                case ModInstNode.prettyName:
                    instruction = new ModInstNode();
                    break;
                case OrInstNode.prettyName:
                    instruction = new OrInstNode();
                    break;
                case XorInstNode.prettyName:
                    instruction = new XorInstNode();
                    break;
                case PushInstNode.prettyName:
                    if (args.length !== 1) throw new Error(`Invalid number of arguments for ${op}`);

                    instruction = new PushInstNode(args[0]);
                    break;
                case PopInstNode.prettyName:
                    if (args.length !== 1) throw new Error(`Invalid number of arguments for ${op}`);

                    instruction = new PopInstNode(args[0]);
                    break;
                case GotoInstNode.prettyName:
                    if (args.length !== 1) throw new Error(`Invalid number of arguments for ${op}`);

                    instruction = new GotoInstNode(parseInt(args[0]));
                    break;
                case JumpInstNode.prettyName:
                    if (args.length !== 2) throw new Error(`Invalid number of arguments for ${op}`);

                    instruction = new JumpInstNode(parseInt(args[0]), parseInt(args[1]));
                    break;
                case EqInstNode.prettyName:
                    instruction = new EqInstNode();
                    break;
                case GtInstNode.prettyName:
                    instruction = new GtInstNode();
                    break;
                case LtInstNode.prettyName:
                    instruction = new LtInstNode();
                    break;
                case PrintInstNode.prettyName:
                    if (args.length !== 1) throw new Error(`Invalid number of arguments for ${op}`);

                    instruction = new PrintInstNode(args[0]);
                    break;
                default:
                    throw new Error(`Unknown instruction: ${op}`);
            }

            program.push(instruction);
        }

        return program;
    }

    /**
     * Reads the file at the given path and returns its contents.
     * @param path The path to the file.
     * @returns The contents of the file.
     */
    async readFile(path: string): Promise<string> {
        const fs = require('fs');
        return new Promise<string>((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) reject(err);

                resolve(data);
            });
        });
    }
}
