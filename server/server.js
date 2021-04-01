import app from './express'
import config  from '../config/config'

app.listen(config.port, () => {
    console.info('Server is running on port ' + config.port);
})