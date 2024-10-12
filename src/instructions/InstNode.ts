class InstNode {
    private readonly _opcode: number;
    private readonly _prettyName: string;

    constructor(opcode: number, prettyName: string) {
        this._opcode = opcode;
        this._prettyName = prettyName;
    }

    get opcode(): number {
        return this._opcode;
    }

    get prettyName(): string {
        return this._prettyName;
    }
}

export default InstNode;