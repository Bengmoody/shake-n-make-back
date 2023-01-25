const rawCocktailData = require('../data/test-data/cocktails.js')
const rawUserData = require('../data/test-data/users.js')

const seed = require('./seed')

const db = require('../index.js')

seed(rawUserData,rawCocktailData).then(() => db.end())