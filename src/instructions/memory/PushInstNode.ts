import InstNode from "../InstNode";

export default class PushInstNode extends InstNode {
    public static _opcode = 0x23;
    public static _prettyName = "push";

    private _variable: string | null;
    private _value: any;

    constructor(variable?: string | null, value?: any) {
        super(PushInstNode._opcode, PushInstNode._prettyName);

        this._variable = variable || null;
        this._value = value || null;
    }

    public static get opcode(): number {
        return PushInstNode._opcode;
    }

    public static get prettyName(): string {
        return PushInstNode._prettyName;
    }

    public get variable(): string | null {
        return this._variable;
    }

    public set variable(value: string | null) {
        this._variable = value;
    }

    public get value(): any {
        return this._value;
    }

    public set value(value: any) {
        this._value = value;
    }
}