const { getUsers } = require('./models')

exports.bodyTypeChecker = (body, typeObject) => {
    const typeCheckPromise = new Promise((resolve, reject) => {
        // check for types before passing to SQL
        // this is to avoid type coercion, e.g. number being accepted as body by database
        const rejectObject = { status: 0, msg: "" }
        let changeFlag = false;
        for (let property in typeObject) {
            if ((body[property] === undefined) && (property !== "avatar")) {
                // status 400 as bad request, missing "not null" property
                rejectObject.status = 400
                rejectObject.msg += property + " is missing"
                changeFlag = true;
            } else if ((typeof body[property] !== typeObject[property]) && (property !== "avatar")) {
                // status 400 as bad request, wrong datatype of property
                // protects data integrity of database
                rejectObject.status = 400
                rejectObject.msg += property + " is not in correct format"
                changeFlag = true;
            }
        }
        if (changeFlag) {
            reject(rejectObject)
        } else {
            resolve("success")
        }
    })
    return typeCheckPromise;
}

exports.avatarChecker = (avatar) => {
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g

    const avatarCheckerPromise = new Promise((resolve, reject) => {
        let result = avatar.match(regex)
        if (result === null) {
            return reject({ status: 400, msg: "avatar url is invalid" })
        } else {
            return resolve("success")
        }
    })

    return avatarCheckerPromise

}

exports.usernameChecker = (username) => {

    const usernameCheckerPromise = new Promise((resolve, reject) => {
        getUsers()
            .then((res) => {
                let results = res.filter((user) => user.username === username)
                if (results.length > 0) {
                    reject({ status: 400, msg: "username already exists in database" })
                } else {
                    resolve("success")
                }
            })
    })

    return usernameCheckerPromise
}

exports.convertCocktail = (newCocktail, user_id) => {
    let reformattedCocktail = [newCocktail.strDrink, newCocktail.strCategory, (newCocktail.strAlcoholic === "Alcoholic" ? true : false), newCocktail.strGlass, newCocktail.strInstructions, newCocktail.strDrinkThumb, newCocktail.strIngredient1, newCocktail.strIngredient2, newCocktail.strIngredient3, newCocktail.strIngredient4, newCocktail.strIngredient5, newCocktail.strIngredient6, newCocktail.strIngredient7, newCocktail.strIngredient8, newCocktail.strIngredient9, newCocktail.strIngredient10, newCocktail.strIngredient11, newCocktail.strIngredient12, newCocktail.strIngredient13, newCocktail.strIngredient14, newCocktail.strIngredient15, newCocktail.strMeasure1, newCocktail.strMeasure2, newCocktail.strMeasure3, newCocktail.strMeasure4, newCocktail.strMeasure5, newCocktail.strMeasure6, newCocktail.strMeasure7, newCocktail.strMeasure8, newCocktail.strMeasure9, newCocktail.strMeasure10, newCocktail.strMeasure11, newCocktail.strMeasure12, newCocktail.strMeasure13, newCocktail.strMeasure14, newCocktail.strMeasure15, user_id]
    return reformattedCocktail
}

exports.cocktailBodyTypeChecker = (cocktail) => {
    const requiredProperties = ["strDrink", "strCategory", "strAlcoholic", "strInstructions"]
    const promiseArr = []

    function cocktailBodyCheckerPromiseFunc(propertyName, propertyValue) {
        const cocktailBodyCheckerPromise = new Promise((resolve, reject) => {
            if (requiredProperties.indexOf(propertyName) !== -1) {
                if (propertyValue === null) {
                    return reject({ status: 400, msg: `${propertyName === "strDrink" ? "title" : (propertyName === "strDrinkThumb" ? "thumbnail" : propertyName.slice(3).toLowerCase())} is missing` })
                } else if (typeof propertyValue !== "string") {
                    return reject({ status: 400, msg: `${propertyName === "strDrink" ? "title" : (propertyName === "strDrinkThumb" ? "thumbnail" : propertyName.slice(3).toLowerCase())} is invalid` })
                } else {
                    return resolve("success")
                }
            } else {
                if ((typeof propertyValue !== "string") && (propertyValue !== null)) {
                    return reject({ status: 400, msg: `${propertyName === "strDrink" ? "title" : (propertyName === "strDrinkThumb" ? "thumbnail" : propertyName.slice(3).toLowerCase())} is invalid` })
                } else {
                    return resolve("success")
                }
            }
        }
        )

        return cocktailBodyCheckerPromise
    }
    for (let x in cocktail) {
        promiseArr.push(cocktailBodyCheckerPromiseFunc(x, cocktail[x]))
    }
    return Promise.all(promiseArr)
}


