import * as path from 'path'
import * as fs from 'fs'

const pdf = require('pdf-parse');

export default class PDF {
    private filePath: string;
    private dataBuffer: Buffer;
    public content: string = '';

    constructor(fileName: string) {
        this.filePath = path.join("uploads", fileName);
        this.dataBuffer= fs.readFileSync(this.filePath);
    }

    public async extact() {
        const pdfData = await pdf(this.dataBuffer)
        this.content = pdfData.text;
    }

}
