import InstNode from "../InstNode";

export default class AddInstNode extends InstNode {
    public static _opcode = 0x01;
    public static _prettyName = "add";

    constructor() {
        super(AddInstNode._opcode, AddInstNode._prettyName);
    }

    public static get opcode(): number {
        return AddInstNode._opcode;
    }

    public static get prettyName(): string {
        return AddInstNode._prettyName;
    }
}