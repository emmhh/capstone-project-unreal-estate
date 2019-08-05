var production = (process.env.NODE_ENV === "production")
export var Config = (production ? require('./config.prod.json') : require('./config.dev.json'))