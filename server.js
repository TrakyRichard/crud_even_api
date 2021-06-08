import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import bodyparser from "body-parser";
import eventsRoutes from "./server/routes/events.js";
import mongoose from 'mongoose';

const app = express();
dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 5000;

//  Log request
app.use(morgan("tiny"));

// Parse request to body parser.
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Events route
app.use("/events", eventsRoutes);

// Mongoose connexion
mongoose.connect("mongodb+srv://Traky:events@eventsapp.i8ggz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connect to Mongo Db");
});

// set view engine
app.set("view engine", "ejs");
// app.set("views",path.resolve(__dirname, "views/ejs"))

app.get("/", (req, res) => {
    res.send("CRUD Application");
})

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)})  