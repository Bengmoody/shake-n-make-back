const ENV = process.env.NODE_ENV
let rawCocktailData, rawUserData
console.log(ENV,typeof ENV)
if (ENV === "test" || ENV === "dev") {
    rawCocktailData = require('../data/test-data/cocktails.js')
    rawUserData = require('../data/test-data/users.js')
} else if (ENV === "production"){
    rawCocktailData = require('../data/dev-data/cocktails.js')
    rawUserData = require('../data/dev-data/users.js')
}

const seed = require('./seed')

const db = require('../index.js')

seed(rawUserData,rawCocktailData).then(() => db.end())