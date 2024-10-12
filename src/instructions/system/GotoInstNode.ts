import InstNode from "../InstNode";

export default class GotoInstNode extends InstNode {
    public static _opcode = 0x31;
    public static _prettyName = "goto";

    private _address: number;

    constructor(address: number) {
        super(GotoInstNode._opcode, GotoInstNode._prettyName);

        this._address = address;
    }

    public static get opcode(): number {
        return GotoInstNode._opcode;
    }

    public static get prettyName(): string {
        return GotoInstNode._prettyName;
    }

    public get address(): number {
        return this._address;
    }

    public set address(value: number) {
        this._address = value;
    }
}