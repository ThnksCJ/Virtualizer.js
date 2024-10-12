import InstNode from "../InstNode";

export default class JumpInstNode extends InstNode {
    public static _opcode = 0x32;
    public static _prettyName = "jump";

    private _trueBranch: number;
    private _falseBranch: number;

    constructor(trueBranch: number, falseBranch: number) {
        super(JumpInstNode._opcode, JumpInstNode._prettyName);

        this._trueBranch = trueBranch;
        this._falseBranch = falseBranch;
    }

    public static get opcode(): number {
        return JumpInstNode._opcode;
    }

    public static get prettyName(): string {
        return JumpInstNode._prettyName;
    }

    public get trueBranch(): number {
        return this._trueBranch;
    }

    public set trueBranch(value: number) {
        this._trueBranch = value;
    }

    public get falseBranch(): number {
        return this._falseBranch;
    }

    public set falseBranch(value: number) {
        this._falseBranch = value;
    }
}