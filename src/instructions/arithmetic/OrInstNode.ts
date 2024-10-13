import InstNode from "../InstNode";

export default class OrInstNode extends InstNode {
    public static _opcode = 0x07;
    public static _prettyName = "or";

    constructor() {
        super(OrInstNode._opcode, OrInstNode._prettyName);
    }

    public static get opcode(): number {
        return OrInstNode._opcode;
    }

    public static get prettyName(): string {
        return OrInstNode._prettyName;
    }
}