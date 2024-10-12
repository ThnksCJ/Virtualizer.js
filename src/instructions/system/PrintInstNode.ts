import InstNode from "../InstNode";

export default class PrintInstNode extends InstNode {
    public static _opcode = 0x33;
    public static _prettyName = "print";

    private _variable: any | null;

    constructor(variable: any | null = null) {
        super(PrintInstNode._opcode, PrintInstNode._prettyName);

        this._variable = variable;
    }

    public static get opcode(): number {
        return PrintInstNode._opcode;
    }

    public static get prettyName(): string {
        return PrintInstNode._prettyName;
    }

    public get variable(): any | null {
        return this._variable;
    }

    public set variable(value: any | null) {
        this._variable = value;
    }
}