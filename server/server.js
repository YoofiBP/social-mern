import path from 'path';
import express from "express";
import devBundle from "./devBundle";
import template from "../template";
import mongoose from "mongoose";

const CURRENT_WORKING_DIR = process.cwd();
const PORT = process.env.PORT || 3000;
const app = express();
devBundle.compile(app)

const DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/social'

mongoose.connect(DB_URL).then(function(){
    console.log('Database connection established');
})

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
    res.status(200).send(template())
})

app.listen(PORT, (err) => {
    if(err){
        console.error(err);
    }else {
        console.info(`Application running on PORT: ${PORT}`)
    }
})
