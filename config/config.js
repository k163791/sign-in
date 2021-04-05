const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.POST || 8000,
    jwtSecret: process.env.JWT_SECRET || "secret",
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://uzair:Qwerty123@cluster0.tyx2o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
}

export default config