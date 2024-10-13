import InstNode from "../InstNode";

export default class ModInstNode extends InstNode {
    public static _opcode = 0x05;
    public static _prettyName = "mod";

    constructor() {
        super(ModInstNode._opcode, ModInstNode._prettyName);
    }

    public static get opcode(): number {
        return ModInstNode._opcode;
    }

    public static get prettyName(): string {
        return ModInstNode._prettyName;
    }
}