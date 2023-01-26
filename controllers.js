const { patchUserByUserId,deleteCocktailByCocktailId, getUserByUserId, getCocktailsByUserId, getUserbyUsername, getUsers, getCocktails, postUser, postCocktail } = require("./models")
const { patchBodyChecker,bodyTypeChecker, avatarChecker, usernameChecker, convertCocktail, cocktailBodyTypeChecker } = require("./utils")
const fs = require('fs/promises')

const selectUsers = (req, res, next) => {
    getUsers()
        .then((users) => {
            res.status(200).send({ users })
        })
}
const selectCocktails = (req, res, next) => {
    getCocktails()
        .then((cocktails) => {
            res.status(200).send({ cocktails })
        })
}
const addUser = (req, res, next) => {
    const typeObject = { username: "string", password: "string", avatar: "string", over18: "boolean" }
    bodyTypeChecker(req.body, typeObject)
        .then((res) => {
            if (req.body.avatar !== undefined) {
                return avatarChecker(req.body.avatar)
            } else {
                return Promise.resolve("success")
            }
        })
        .then((res) => {
            return usernameChecker(req.body.username)
        })
        .then((res) => {
            return postUser(req.body)
        })
        .then((user) => {
            res.status(200).send({ user })
        })
        .catch((err) => {
            next(err)
        })
}

const addCocktail = (req, res, next) => {
    let { user_id } = req.params
    cocktailBodyTypeChecker(req.body)
        .then((res) => {
            const formattedCocktail = convertCocktail(req.body, user_id)
            return postCocktail(formattedCocktail)
        })
        .then((cocktail) => {
            res.status(200).send({ cocktail })
        })
        .catch((err) => {
            err.propName = 'user_id'
            next(err)
        })
}




const selectUserbyUserId = (req, res, next) => {
    const { user_id } = req.params
    getUserByUserId(user_id).then((user) => {
        res.status(200).send({ user })
    }).catch((err) => {
        err.propName = 'user_id'
        next(err)
    })
}

const selectUserByUsername = (req, res, next) => {
    const { username } = req.params
    getUserbyUsername(username).then((user) => {
        res.status(200).send({ user })
    }).catch((err) => {
        next(err)
    })
}

const selectCocktailsByUserId = (req, res, next) => {
    const { user_id } = req.params
    const promiseArr = []
    promiseArr.push(getCocktailsByUserId(user_id))
    promiseArr.push(getUserByUserId(user_id))
    return Promise.all(promiseArr)
        .then((results) => {
            res.status(200).send({ cocktails:results[0] })
        }).catch((err) => {
            err.propName = 'user_id'
            next(err)
        })
}

const removeCocktailByCocktailId = (req, res, next) => {
    const { cocktail_id } = req.params
    deleteCocktailByCocktailId(cocktail_id).then(() => {
        res.status(204).send()
    }).catch((err) => {
        err.propName = 'cocktail_id'
        next(err)
    })

}

const updateUserByUserId = (req,res,next) => {
    const { user_id } = req.params
    const typeObject = {password: "string",avatar:"string",over18:"boolean"}
    patchBodyChecker(req.body,typeObject)
    .then((res) => {
        if (req.body.avatar) {
            return avatarChecker(req.body.avatar)
        } else {
            return Promise.resolve("success")
        }
    })
    .then((res) => {
        return patchUserByUserId(req.body,user_id)
    })
    .then((user) => {
        res.status(202).send({user})
    })
    .catch((err) => {
        err.propName = "user_id"
        next(err)
    })
}

const fetchJson = (req,res,next) => {
    fs.readFile(`${__dirname}/endpoints.json`,"utf-8")
    .then((data) => {
        console.log(data)
        let endpoints = JSON.parse(data)
        res.status(200).send({endpoints})
    })
    .catch((err) => {
        err.status = 404;
        err.msg = "endpoints.json file not found in main directory";
        next(err)
    })
}

module.exports = { fetchJson, updateUserByUserId,removeCocktailByCocktailId, selectUserbyUserId, selectCocktailsByUserId, selectUserByUsername, selectUsers, selectCocktails, addUser, addCocktail }
