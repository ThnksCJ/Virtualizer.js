import InstNode from "../instructions/InstNode";
import MovInstNode from "../instructions/memory/MovInstNode";
import PushInstNode from "../instructions/memory/PushInstNode";
import GtInstNode from "../instructions/comparisons/GtInstNode";
import JumpInstNode from "../instructions/system/JumpInstNode";
import AddInstNode from "../instructions/arithmetic/AddInstNode";
import GotoInstNode from "../instructions/system/GotoInstNode";
import PrintInstNode from "../instructions/system/PrintInstNode";
import PopInstNode from "../instructions/memory/PopInstNode";
import SubInstNode from "../instructions/arithmetic/SubInstNode";
import MulInstNode from "../instructions/arithmetic/MulInstNode";
import DivInstNode from "../instructions/arithmetic/DivInstNode";
import EqInstNode from "../instructions/comparisons/EqInstNode";
import LtInstNode from "../instructions/comparisons/LtInstNode";

export default class Interpreter {
    tokenize(input: string): InstNode[] {
        const program: InstNode[] = [];
        const lines = input.split('\n');

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
