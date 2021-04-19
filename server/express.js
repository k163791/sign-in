import express from 'express'
import helmet from 'helmet'
import compress from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import MainRouter from '../client/MainRouter'

// Import routes
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
// devBundle bundles the frontend code and renders it
import devBundle from './devBundle'
import path from 'path'
// Import front end file
import Template from '../template'

const app = express();

devBundle.compile(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(helmet());
app.use(compress());
app.use(cors())

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// Routes
app.use('/',userRoutes)
app.use('/', authRoutes)

app.use('*', (req, res) => {
    res.status(200).send(Template())
})

// Authorization error
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
      res.status(400).json({"error" : err.name + ": " + err.message})
      console.log(err)
    }
  })

export default app;