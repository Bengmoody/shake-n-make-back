const { getUserbyUsername, getUsers, getCocktails, postUser, postCocktail } = require("./models")
const { bodyTypeChecker, avatarChecker, usernameChecker, convertCocktail, cocktailBodyTypeChecker } = require("./utils")
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

module.exports = { selectUserByUsername, selectUsers, selectCocktails, addUser, addCocktail }