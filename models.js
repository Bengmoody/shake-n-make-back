const db = require('./db/index.js')

exports.getUsers = () => {
    return db.query('SELECT * FROM users;').then(({ rows }) => {
        return rows
    })
}

exports.getCocktails = () => {
    return db.query('SELECT * FROM cocktails;').then(({ rows }) => {
        return rows
    })
}

exports.postUser = ({ username, password, avatar, over18 }) => {
    let inputArr = []
    if (avatar) {
        inputArr = [username, password, avatar, over18]
        return db.query('INSERT INTO users (username,password,avatar,over18) VALUES ($1,$2,$3,$4) RETURNING *;', inputArr)
            .then(({ rows }) => {
                return rows[0]
            })
    } else if (avatar === undefined) {
        inputArr = [username, password, over18]
        return db.query('INSERT INTO users (username,password,over18) VALUES ($1,$2,$3) RETURNING *;', inputArr)
            .then(({ rows }) => {
                return rows[0]
            })
    }
}

exports.postCocktail = (cocktail) => {
    return db.query('INSERT INTO cocktails (title,category,alcoholic,glass,instructions,thumbnail,ingredient1,ingredient2,ingredient3,ingredient4,ingredient5,ingredient6,ingredient7,ingredient8,ingredient9,ingredient10,ingredient11,ingredient12,ingredient13,ingredient14,ingredient15,measure1,measure2,measure3,measure4,measure5,measure6,measure7,measure8,measure9,measure10,measure11,measure12,measure13,measure14,measure15,linked_user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37) RETURNING *;', cocktail)
        .then(({ rows }) => {
            return rows[0]
        })
}

exports.getUserbyUsername = (username) => {
    return db.query(`SELECT * FROM users WHERE username = $1;`, [username])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "username not found in database" })
            } else {
                return rows[0]

            }
        })
}

exports.getCocktailsByUserId = (user_id) => {
    return db.query(`SELECT * FROM cocktails
    WHERE linked_user_id = $1;`, [user_id])
        .then(({ rows }) => {
            return rows
        })
}

exports.getUserByUserId = (user_id) => {
    return db.query(`SELECT * FROM users
    WHERE user_id = $1;`, [user_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "user_id not found in database" })
            } else {
                return rows[0]
            }
        })
}

exports.deleteCocktailByCocktailId = (cocktail_id) => {
    return db.query(`DELETE FROM cocktails WHERE cocktail_id = $1 RETURNING *;`, [cocktail_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "cocktail_id does not exist in database" })
            } else {
                return
            }
        })

}

exports.patchUserByUserId = (body, user_id) => {
    let { password, avatar, over18 } = body
    let inputArr = []

    let sql = `UPDATE users SET `
    let count = 1;
    for (let x in body) {
        if (body[x] !== undefined) {
            sql += `${x} = $${count}, `
            count += 1
            inputArr.push(body[x])
        }
    }
    sql = sql.slice(0, -2)
    sql += ` WHERE user_id = $${count} RETURNING *;`
    inputArr.push(user_id)
    return db.query(sql, inputArr)
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "user_id not found in database" })
            } else {
                return rows[0];
            }
        })
}

