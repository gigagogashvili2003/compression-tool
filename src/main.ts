import path from 'path';
import { FrequencyManager } from './frequency-manager';
import { HuffTree } from './huffman-tree/huff-tree';
import Heap from 'heap-js';

async function countOccurences() {
    const frequencyManager = new FrequencyManager();
    const frequencyMap = await frequencyManager.countOccurences(path.join(__dirname, 'test.txt'));
    // frequencyManager.printOccurences();

    const tree = new HuffTree();
    const huffTree = tree.buildHuffTree(frequencyMap);

    console.log(tree.generatePrefixTable(huffTree));
}

countOccurences();
