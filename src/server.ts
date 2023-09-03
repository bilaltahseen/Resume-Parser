import * as path from 'path'
import upload from './helper/upload';
import PDFObject from './Classes/PdfObject';
import Classifier from './Classes/Classifier';
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


dotenv.config();

const app = express();
const port = process.env.PORT;

// set the view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

app.get('/', (req: any, res: any) => {
  res.render("pages/index");
});

app.post('/detect',upload, async (req: any, res: any) => {
  const fileName = req.fileName
  const jobKeywords = req.fields["job-keyword"][0]
  const PDF = new PDFObject(fileName);
  await PDF.extact();
  const classifier = new Classifier(process.env.OPENAI_API_KEY);
  const response = await classifier.classify(jobKeywords,PDF.content);
  res.render("pages/index",{content: response.choices[0].message.content});
  res.render("pages/index",{content: PDF.content});
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});