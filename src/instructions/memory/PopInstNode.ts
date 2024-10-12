import InstNode from "../InstNode";

export default class PopInstNode extends InstNode {
    public static _opcode = 0x22;
    public static _prettyName = "pop";

    private _variable: string;

    constructor(variable: string = null) {
        super(PopInstNode._opcode, PopInstNode._prettyName);

        this._variable = variable;
    }

    public static get opcode(): number {
        return PopInstNode._opcode;
    }

    public static get prettyName(): string {
        return PopInstNode._prettyName;
    }

    public get variable(): string {
        return this._variable;
    }

    public set variable(value: string) {
        this._variable = value;
    }
}