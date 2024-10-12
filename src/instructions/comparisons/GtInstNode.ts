import InstNode from "../InstNode";

export default class GtInstNode extends InstNode {
    public static _opcode = 0x12;
    public static _prettyName = "gt";

    constructor() {
        super(GtInstNode._opcode, GtInstNode._prettyName);
    }

    public static get opcode(): number {
        return GtInstNode._opcode;
    }

    public static get prettyName(): string {
        return GtInstNode._prettyName;
    }
}