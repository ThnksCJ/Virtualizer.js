import InstNode from "../InstNode";

export default class LtInstNode extends InstNode {
    public static _opcode = 0x13;
    public static _prettyName = "lt";

    constructor() {
        super(LtInstNode._opcode, LtInstNode._prettyName);
    }

    public static get opcode(): number {
        return LtInstNode._opcode;
    }

    public static get prettyName(): string {
        return LtInstNode._prettyName;
    }
}