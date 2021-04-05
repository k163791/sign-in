import app from './express'
import config  from '../config/config'
import mongoose from 'mongoose'

// mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to db ${config.mongoUri}`)
})

app.listen(config.port, () => {
    console.info('Server is running on port ' + config.port);
})