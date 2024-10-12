import InstNode from "../InstNode";

export default class DivInstNode extends InstNode {
    public static _opcode = 0x02;
    public static _prettyName = "div";

    constructor() {
        super(DivInstNode._opcode, DivInstNode._prettyName);
    }

    public static get opcode(): number {
        return DivInstNode._opcode;
    }

    public static get prettyName(): string {
        return DivInstNode._prettyName;
    }
}