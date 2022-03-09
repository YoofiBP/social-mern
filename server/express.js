import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compress from "compression";
import cors from "cors";
import template from "../template";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import errorController from './controllers/error.controller';
import path from "path";

const app = express();

const CURRENT_WORKING_DIR = process.cwd();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());

app.use('/', authRouter);
app.use(userRouter);

app.use(errorController.handleError)

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, '/dist')));

app.get('/', (req, res) => {
    res.status(200).send(template());
})

export default app;