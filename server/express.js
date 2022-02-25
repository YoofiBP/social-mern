import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compress from "compression";
import cors from "cors";
import template from "../template";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send(template());
})

export default app;