import {logger} from "./global";
import VirtualMachine from "./internal/VirtualMachine";
import Interpreter from "./internal/Interpreter";

(async () => {
    logger.global.info('Starting Virtualizer.js');

    const interpreter = new Interpreter();
    const programInter = interpreter.tokenize(await interpreter.readFile('examples/asm.vjs'));

    const vm = new VirtualMachine();
    await vm.execute(programInter);

    logger.global.info('Virtualizer.js finished');
})();