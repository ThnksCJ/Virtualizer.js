import InstNode from "../InstNode";

export default class EqInstNode extends InstNode {
    public static _opcode = 0x11;
    public static _prettyName = "eq";

    constructor() {
        super(EqInstNode._opcode, EqInstNode._prettyName);
    }

    public static get opcode(): number {
        return EqInstNode._opcode;
    }

    public static get prettyName(): string {
        return EqInstNode._prettyName;
    }
}