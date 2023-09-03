import * as path from 'path';
import * as fs from 'fs';
const formidable = require('formidable')

export default function upload(req: any, res: any, next: any) {
    if (req.method !== 'POST') return;
    try {


        const form = new formidable.IncomingForm({ keepExtensions: true });
        form.keepExtensions = true;
        form.uploadDir = path.basename(path.join(__dirname, '../uploads'));

        // log any errors that occur
        form.on('error', function (err: Error) {
            console.log('An error has occured: \n' + err);
        });

        form.on('end', () => {
            req.fileName = form.openedFiles[0].newFilename;
        });

        form.parse(req, function (err: Error, fields: any, files: any) {
            req.fields = fields;
            next();
        });
    } catch (error) {
        console.log("🚀 ~ file: upload.ts:26 ~ upload ~ error:", error)
        res.statusMessage = "Process failed";
        res.statusCode = 500;
        res.redirect('/')
        res.end()
    }


}
