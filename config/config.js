const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.POST || 4500,
    jwtSecret: process.env.JWT_SECRET || "secret",
    mongoUri: process.env.MONGODB_URI || process.env.MONGODB_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + '/mernproject',
}

export default config