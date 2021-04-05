import express from 'express'
import helmet from 'helmet'
import compress from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// Import routes
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// import devBundle from './devBundle'

const app = express();

// devBundle.compile(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(helmet());
app.use(compress());
app.use(cors())

// Routes
app.use('/',userRoutes)
app.use('/', authRoutes)

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