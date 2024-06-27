import { IHuffBaseNode } from '../interfaces';

export class HuffInternalNode implements IHuffBaseNode {
    private weight: number;
    private left: IHuffBaseNode;
    private right: IHuffBaseNode;

    public constructor(left: IHuffBaseNode, right: IHuffBaseNode, weight: number) {
        this.left = left;
        this.right = right;
        this.weight = weight;
    }

    public isLeaf(): boolean {
        return false;
    }
    public getWeight(): number {
        return this.weight;
    }

    public getLeft(): IHuffBaseNode {
        return this.left;
    }

    public getRight(): IHuffBaseNode {
        return this.right;
    }
}
