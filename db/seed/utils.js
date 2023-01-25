let rawUserData = require('../data/test-data/users.js')
let rawCocktailData = require('../data/test-data/cocktails.js')

function convertCocktails(rawCocktailData) {
    let reformattedCocktails = rawCocktailData.map((cocktail) => {
        
        return [cocktail.strDrink,cocktail.strCategory,(cocktail.strAlcoholic === "Alcoholic" ? true: false),cocktail.strGlass, cocktail.strInstructions,cocktail.strDrinkThumb,cocktail.strIngredient1 ,cocktail.strIngredient2,cocktail.strIngredient3,cocktail.strIngredient4,cocktail.strIngredient5,cocktail.strIngredient6,cocktail.strIngredient7,cocktail.strIngredient8,cocktail.strIngredient9,cocktail.strIngredient10,cocktail.strIngredient11,cocktail.strIngredient12,cocktail.strIngredient13,cocktail.strIngredient14,cocktail.strIngredient15,cocktail.strMeasure1,cocktail.strMeasure2,cocktail.strMeasure3,cocktail.strMeasure4,cocktail.strMeasure5,cocktail.strMeasure6,cocktail.strMeasure7,cocktail.strMeasure8,cocktail.strMeasure9,cocktail.strMeasure10,cocktail.strMeasure11,cocktail.strMeasure12,cocktail.strMeasure13,cocktail.strMeasure14,cocktail.strMeasure15,Math.round(Math.random()*4)+1]
    })
    return reformattedCocktails
}
function convertUsers(rawUserData) {
    let reformattedUsers = rawUserData.map((user) => {
        return [user.username,user.password,user.avatar,user.over18]
    })
    return reformattedUsers
}


let processedCocktails = convertCocktails(rawCocktailData)

module.exports.convertCocktails = convertCocktails;
module.exports.convertUsers = convertUsers;