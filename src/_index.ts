import Classifier from './Classes/Classifier';
import PDFObject from './Classes/PdfObject'
import 'dotenv/config'

// async function main(){
//     const PDF = new PDFObject('sample.pdf');
//     await PDF.extact();
//     const content = PDF.content;
//     const classifier = new Classifier(process.env.OPENAI_API_KEY);
//     const response = await classifier.classify(content);
//     console.log(JSON.stringify(response));
// }
// main();