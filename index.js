import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/updateData", (req,res) => {
    //get the JSON file
    const data = JSON.parse(fs.readFileSync("public/data/cards.json"));
    //set the value
    data.subject = req.body.subject;
    //write back to the JSON file
    fs.writeFileSync("public/data/cards.json",JSON.stringify(data,null,2));
    //respond when completed
    res.sendStatus(200);
});

app.listen(port, () =>{
    console.log(`Server has started at http://localhost:${port}`);
})