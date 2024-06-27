import Heap from 'heap-js';
import { IHuffBaseNode, IPrefixTableValue } from '../interfaces';
import { FrequencyMap, PrefixTableMap } from '../types';
import { HuffInternalNode } from './huff-internal-node';
import { HuffLeafNode } from './huff-leaf-node';

export class HuffTree {
    private root: IHuffBaseNode;
    private prefixTable: PrefixTableMap = new Map<string, IPrefixTableValue>();

    public constructor(root?: IHuffBaseNode) {
        this.root = new HuffLeafNode('c', 2);
    }

    public getRoot(): IHuffBaseNode {
        return this.root;
    }

    public getWeight(): number {
        return this.root.getWeight();
    }

    public buildHuffTree(frequencyMap: FrequencyMap): IHuffBaseNode {
        const minHeap = new Heap<IHuffBaseNode>((a, b) => a.getWeight() - b.getWeight());

        for (const [character, frequency] of frequencyMap) {
            const huffLeafNode = new HuffLeafNode(character, frequency);
            minHeap.push(huffLeafNode);
        }

        while (minHeap.size() > 1) {
            const left = minHeap.pop() as IHuffBaseNode;
            const right = minHeap.pop() as IHuffBaseNode;

            const huffInternalNode = new HuffInternalNode(left, right, left.getWeight() + right.getWeight());
            minHeap.push(huffInternalNode);
        }

        this.root = minHeap.pop() as IHuffBaseNode;
        return this.root;
    }

    public generatePrefixTable(root: IHuffBaseNode) {
        this.dfs(root, '');
        return this.prefixTable;
    }
    public dfs(root: IHuffBaseNode, prefix: string) {
        if (root instanceof HuffLeafNode) {
            const character = root.getCharacter();
            const weight = root.getWeight();
            this.prefixTable.set(character, {
                frequency: weight,
                bits: prefix.length,
                code: prefix,
                char: character,
            });
            return;
        }

        if (root instanceof HuffInternalNode) {
            const left = root.getLeft();
            const right = root.getRight();

            this.dfs(left, prefix + '0');
            this.dfs(right, prefix + '1');
        }
    }
}
