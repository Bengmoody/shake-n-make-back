const db=require('./db/index.js')

exports.getUsers=() => {
    return db.query('SELECT * FROM users;').then(({rows}) => {
        return rows
    })
}

exports.getCocktails=() => {
    return db.query('SELECT * FROM cocktails;').then(({rows}) => {
        return rows
    })
}

exports.postUser=({username,password,avatar,over18}) => {
    let inputArr = []
    if (avatar) {
        inputArr = [username,password,avatar,over18]
        return db.query('INSERT INTO users (username,password,avatar,over18) VALUES ($1,$2,$3,$4) RETURNING *;',inputArr)
        .then(({rows}) => {
            return rows[0]
        })
    } else if (avatar === undefined) {
        inputArr = [username,password,over18]
        return db.query('INSERT INTO users (username,password,over18) VALUES ($1,$2,$3) RETURNING *;',inputArr)
        .then(({rows}) => {
            return rows[0]
        })
    }
}

exports.postCocktail=(cocktail) => {
    return db.query('INSERT INTO cocktails (title,category,alcoholic,glass,instructions,thumbnail,ingredient1,ingredient2,ingredient3,ingredient4,ingredient5,ingredient6,ingredient7,ingredient8,ingredient9,ingredient10,ingredient11,ingredient12,ingredient13,ingredient14,ingredient15,measure1,measure2,measure3,measure4,measure5,measure6,measure7,measure8,measure9,measure10,measure11,measure12,measure13,measure14,measure15,linked_user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37) RETURNING *;',cocktail)
    .then(({rows}) => {
        return rows[0]
    })
}