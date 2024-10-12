import InstNode from "../InstNode";

export default class MovInstNode extends InstNode {
    public static _opcode = 0x21;
    public static _prettyName = "mov";

    private _variable: string;
    private _value: any;

    constructor(variable: string, value: any) {
        super(MovInstNode._opcode, MovInstNode._prettyName);

        this._variable = variable;
        this._value = value;
    }

    public static get opcode(): number {
        return MovInstNode._opcode;
    }

    public static get prettyName(): string {
        return MovInstNode._prettyName;
    }

    public get variable(): string {
        return this._variable;
    }

    public set variable(value: string) {
        this._variable = value;
    }

    public get value(): any {
        return this._value;
    }

    public set value(value: any) {
        this._value = value;
    }
}