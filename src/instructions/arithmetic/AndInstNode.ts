import InstNode from "../InstNode";

export default class AndInstNode extends InstNode {
    public static _opcode = 0x06;
    public static _prettyName = "and";

    constructor() {
        super(AndInstNode._opcode, AndInstNode._prettyName);
    }

    public static get opcode(): number {
        return AndInstNode._opcode;
    }

    public static get prettyName(): string {
        return AndInstNode._prettyName;
    }
}