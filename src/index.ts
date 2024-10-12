import {logger} from "./global";
import VirtualMachine from "./internal/VirtualMachine";
import MovInstNode from "./instructions/memory/MovInstNode";
import PushInstNode from "./instructions/memory/PushInstNode";
import GtInstNode from "./instructions/comparisons/GtInstNode";
import JumpInstNode from "./instructions/system/JumpInstNode";
import AddInstNode from "./instructions/arithmetic/AddInstNode";
import GotoInstNode from "./instructions/system/GotoInstNode";
import PrintInstNode from "./instructions/system/PrintInstNode";
import PopInstNode from "./instructions/memory/PopInstNode";
import SubInstNode from "./instructions/arithmetic/SubInstNode";

(async () => {
    logger.global.info('Starting Virtualizer.js');

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
        new PushInstNode(null, 10),
        new PushInstNode("x"),
        new AddInstNode(),
        new PopInstNode("x"),
        new GotoInstNode(15),
        /* End true block */

        /* Start false block */
        new PushInstNode(null, 5),
        new PushInstNode("x"),
        new SubInstNode(),
        new PopInstNode("x"),
        /* End false block */

        new PrintInstNode("x")
    ];

    const vm = new VirtualMachine();
    await vm.execute(program);

    logger.global.info('Virtualizer.js finished');
})();