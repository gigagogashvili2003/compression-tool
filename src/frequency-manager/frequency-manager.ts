import fs from 'fs';

import { Chunk, FrequencyMap } from '../types';

export class FrequencyManager {
    private frequencyMap: FrequencyMap = new Map<string, number>();

    public constructor() {}

    public countOccurences(file: string): Promise<FrequencyMap> {
        return new Promise((resolve, reject) => {
            const readableStream = fs.createReadStream(file, { highWaterMark: 1024 * 1024 });
            readableStream.on('data', this.handleData.bind(this));

            readableStream.on('error', (error) => {
                reject(error);
            });

            readableStream.on('end', () => {
                resolve(this.getFrequencyMap());
            });
        });
    }

    private handleData(chunk: Chunk) {
        const chunkString = chunk.toString();

        for (const character of chunkString) {
            const characterFrequency = this.frequencyMap.get(character) ?? 0;
            this.frequencyMap.set(character, characterFrequency + 1);
        }
    }

    public printOccurences() {
        for (const [character, frequency] of this.frequencyMap) {
            const formattedString = `There ${frequency === 1 ? 'is' : 'are'} ${frequency} occurrences of the character '${character}'.`;
            console.log(formattedString);
        }
    }

    public getFrequencyMap(): FrequencyMap {
        return this.frequencyMap;
    }
}
