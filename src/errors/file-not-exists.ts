export class FileNotExistsError extends Error {
    constructor(filePath: string) {
        super(`File ${filePath} does not exist`);
    }
}
