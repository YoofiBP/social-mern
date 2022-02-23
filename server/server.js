
// import devBundle from "./devBundle";
import mongoose from "mongoose";
import app from "./express";
import config from './config/config'

const PORT = config.port;

const DB_URL = config.mongoUri;
// devBundle.compile(app);
mongoose.connect(DB_URL, {

})

app.listen(PORT, (err) => {
    if(err){
        console.error(err);
    }else {
        console.info(`Application running on PORT: ${PORT}`)
    }
})