const db = require("../index.js")
const { convertUsers, convertCocktails} = require('./utils.js')

const format = require('pg-format')

const seed = (rawUserData,rawCocktailData) => {
    return db.query('DROP TABLE IF EXISTS cocktails;')
    .then(() => {
        return db.query('DROP TABLE IF EXISTS users;')
    })
    .then(() => {
        return db.query('CREATE TABLE users (user_id SERIAL PRIMARY KEY, username VARCHAR(40) NOT NULL, password VARCHAR(40) NOT NULL, avatar TEXT, over18 BOOLEAN NOT NULL);')
    })
    .then(() => {
        return db.query('CREATE TABLE cocktails (cocktail_id SERIAL PRIMARY KEY, title VARCHAR(40) NOT NULL, category VARCHAR(30) NOT NULL, alcoholic BOOLEAN NOT NULL, glass VARCHAR(30), instructions TEXT NOT NULL, thumbnail TEXT, ingredient1 VARCHAR(30), ingredient2 VARCHAR(30), ingredient3 VARCHAR(30), ingredient4 VARCHAR(30), ingredient5 VARCHAR(30), ingredient6 VARCHAR(30), ingredient7 VARCHAR(30), ingredient8 VARCHAR(30), ingredient9 VARCHAR(30), ingredient10 VARCHAR(30), ingredient11 VARCHAR(30), ingredient12 VARCHAR(30), ingredient13 VARCHAR(30), ingredient14 VARCHAR(30), ingredient15 VARCHAR(30), measure1 VARCHAR(30), measure2 VARCHAR(30), measure3 VARCHAR(30), measure4 VARCHAR(30), measure5 VARCHAR(30), measure6 VARCHAR(30), measure7 VARCHAR(30), measure8 VARCHAR(30), measure9 VARCHAR(30), measure10 VARCHAR(30), measure11 VARCHAR(30), measure12 VARCHAR(30), measure13 VARCHAR(30), measure14 VARCHAR(30), measure15 VARCHAR(30), created_at TIMESTAMP DEFAULT NOW(), linked_user_id INT REFERENCES users(user_id));')
    })
    .then(() => {

        let processedUserData = convertUsers(rawUserData)
        let sql = format(`INSERT INTO users (username, password, avatar, over18) VALUES %L RETURNING *;`,processedUserData)  
        return db.query(sql);
    })
    .then(() => {

        let processedCocktailData = convertCocktails(rawCocktailData)
        let sql = format('INSERT INTO cocktails (title,category,alcoholic,glass,instructions,thumbnail,ingredient1,ingredient2,ingredient3,ingredient4,ingredient5,ingredient6,ingredient7,ingredient8,ingredient9,ingredient10,ingredient11,ingredient12,ingredient13,ingredient14,ingredient15,measure1,measure2,measure3,measure4,measure5,measure6,measure7,measure8,measure9,measure10,measure11,measure12,measure13,measure14,measure15,linked_user_id) VALUES %L RETURNING *;',processedCocktailData);
        return db.query(sql)
    })
    .then(() => {
        return "successful"
    })
    .catch((err) => {
        console.error(err)
    })
}


module.exports = seed;