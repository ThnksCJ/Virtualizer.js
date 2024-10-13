import MovInstNode from "../src/instructions/memory/MovInstNode";
import PushInstNode from "../src/instructions/memory/PushInstNode";
import GtInstNode from "../src/instructions/comparisons/GtInstNode";
import JumpInstNode from "../src/instructions/system/JumpInstNode";
import AddInstNode from "../src/instructions/arithmetic/AddInstNode";
import PopInstNode from "../src/instructions/memory/PopInstNode";
import GotoInstNode from "../src/instructions/system/GotoInstNode";
import SubInstNode from "../src/instructions/arithmetic/SubInstNode";
import PrintInstNode from "../src/instructions/system/PrintInstNode";
import VirtualMachine from "../src/internal/VirtualMachine";

const program = [
    new MovInstNode("x", 10),
    new MovInstNode("y", 5),

    /* If x > y */
    new PushInstNode("x"),
    new PushInstNode("y"),
    new GtInstNode(),
    new JumpInstNode(6, 11),
    /* End if */

    /* Start true block */
    new PushInstNode(10),
    new PushInstNode("x"),
    new AddInstNode(),
    new PopInstNode("x"),
    new GotoInstNode(15),
    /* End true block */

    /* Start false block */
    new PushInstNode(5),
    new PushInstNode("x"),
    new SubInstNode(),
    new PopInstNode("x"),
    /* End false block */

    new PrintInstNode("x")
];

const vm = new VirtualMachine();
await vm.execute(program);