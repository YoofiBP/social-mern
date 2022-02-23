
// import devBundle from "./devBundle";
import mongoose from "mongoose";
import app from "./express";

const PORT = process.env.PORT || 3000;

const DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/social'
// devBundle.compile(app);
mongoose.connect(DB_URL).then(function(){
    console.log('Database connection established');
})

app.listen(PORT, (err) => {
    if(err){
        console.error(err);
    }else {
        console.info(`Application running on PORT: ${PORT}`)
    }
})