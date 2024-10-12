import InstNode from "../InstNode";

export default class MulInstNode extends InstNode {
    public static _opcode = 0x03;
    public static _prettyName = "mul";

    constructor() {
        super(MulInstNode._opcode, MulInstNode._prettyName);
    }

    public static get opcode(): number {
        return MulInstNode._opcode;
    }

    public static get prettyName(): string {
        return MulInstNode._prettyName;
    }
}