import InstNode from "../InstNode";

export default class PushInstNode extends InstNode {
    public static _opcode = 0x23;
    public static _prettyName = "push";

    private _value: any;

    constructor(value?: any) {
        super(PushInstNode._opcode, PushInstNode._prettyName);

        this._value = value || null;
    }

    public static get opcode(): number {
        return PushInstNode._opcode;
    }

    public static get prettyName(): string {
        return PushInstNode._prettyName;
    }

    public get value(): any {
        return this._value;
    }

    public set value(value: any) {
        this._value = value;
    }
}