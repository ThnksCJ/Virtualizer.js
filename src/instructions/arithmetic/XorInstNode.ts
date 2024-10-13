import InstNode from "../InstNode";

export default class XorInstNode extends InstNode {
    public static _opcode = 0x08;
    public static _prettyName = "xor";

    constructor() {
        super(XorInstNode._opcode, XorInstNode._prettyName);
    }

    public static get opcode(): number {
        return XorInstNode._opcode;
    }

    public static get prettyName(): string {
        return XorInstNode._prettyName;
    }
}