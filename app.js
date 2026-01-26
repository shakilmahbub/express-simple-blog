import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import router from "./routes/main.js";
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import connection from "./app/config/database.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressEjsLayouts);
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore(
    {mongoUrl: process.env.MONGO_URL}
  )
}))
app.set('layout','./layout/main');
app.set('view engine','ejs');

app.use('/',router);
connection();
app.listen(port,()=>{
  console.log('\x1b[36m%s\x1b[0m', 'Server is running!'); // Cyan color
  console.log('\x1b[32m%s\x1b[0m', `Local: http://localhost:${port}`);
  console.log('\x1b[33m%s\x1b[0m', 'Press Ctrl+C to stop');
});