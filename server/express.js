import express from 'express'
import helmet from 'helmet'
import compress from 'compression'
import bodyParser from 'body-parser'

const app = express();

app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


export default app;