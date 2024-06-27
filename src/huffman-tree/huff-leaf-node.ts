import { IHuffBaseNode } from '../interfaces';

export class HuffLeafNode implements IHuffBaseNode {
    private character: string;
    private weight: number;

    public constructor(character: string, weight: number) {
        this.character = character;
        this.weight = weight;
    }

    public isLeaf(): boolean {
        return true;
    }

    public getCharacter(): string {
        return this.character;
    }

    public getWeight(): number {
        return this.weight;
    }
}
