import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import router from "./routes/main.js";
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(express.static('public'));
app.use(expressEjsLayouts);
app.set('layout','./layout/main');
app.set('view engine','ejs');

app.use('/',router);


app.listen(port,()=>{
  console.log('\x1b[36m%s\x1b[0m', 'Server is running!'); // Cyan color
  console.log('\x1b[32m%s\x1b[0m', `Local: http://localhost:${port}`);
  console.log('\x1b[33m%s\x1b[0m', 'Press Ctrl+C to stop');
});