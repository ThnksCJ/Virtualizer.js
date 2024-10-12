import InstNode from "../InstNode";

export default class SubInstNode extends InstNode {
    public static _opcode = 0x04;
    public static _prettyName = "sub";

    constructor() {
        super(SubInstNode._opcode, SubInstNode._prettyName);
    }

    public static get opcode(): number {
        return SubInstNode._opcode;
    }

    public static get prettyName(): string {
        return SubInstNode._prettyName;
    }
}