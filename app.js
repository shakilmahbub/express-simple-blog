import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import router from "./routes/main.js";
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import connection from "./app/config/database.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config(); // Load environment variables from .env
const port = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.static('public')); // Serve static files from 'public' folder
app.use(expressEjsLayouts); // Enable EJS layout support
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(methodOverride('_method')); // Allow PUT/DELETE via POST forms using ?_method
app.use(session({
  secret: 'keyboard cat', // Secret key to sign session ID cookies
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Save new sessions even if they are empty
  store: new MongoStore({ mongoUrl: process.env.MONGO_URL }) // Store sessions in MongoDB
}));

app.set('layout','./layout/main'); // Default EJS layout file
app.set('view engine','ejs'); // Set EJS as the view/template engine

app.use('/', router); // Mount main router for all routes

connection(); // Connect to MongoDB

app.listen(port,()=>{
  console.log('\x1b[36m%s\x1b[0m', 'Server is running!'); // Cyan color log
  console.log('\x1b[32m%s\x1b[0m', `Local: http://localhost:${port}`); // Green color log
  console.log('\x1b[33m%s\x1b[0m', 'Press Ctrl+C to stop'); // Yellow color log
});
