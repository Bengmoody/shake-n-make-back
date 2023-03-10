const request = require('supertest')
const app = require('../app')
const seed = require('./../db/seed/seed.js');
const testCocktails = require('./../db/data/test-data/cocktails')
const testUsers = require('./../db/data/test-data/users')
const db = require('../db/index')
jest.setTimeout(10000)
beforeEach(() => {
    return seed(testUsers, testCocktails)
})

afterAll(() => {
    return db.end()
})

describe('GET /api/users', () => {
    test('receive 200 and 5 users', () => {
        return request(app)
            .get('/api/users')
            .expect(200)
            .then(({ body: { users } }) => {
                expect(users.length).toEqual(5)
            })
    })
})
describe('GET /api/cocktails', () => {
    test('receive 200 and 25 users', () => {
        return request(app)
            .get('/api/cocktails')
            .expect(200)
            .then(({ body: { cocktails } }) => {
                expect(cocktails.length).toEqual(25)
                cocktails.forEach((cocktail) => {
                    expect(cocktail).toMatchObject({
                        cocktail_id: expect.any(Number),
                        linked_user_id: expect.any(Number),
                        instructions: expect.any(String),
                        alcoholic: expect.any(Boolean)
                    })
                })
            })
    })
})

describe('POST /api/users', () => {
    test('valid input body gives 200 and user with integer ID', () => {
        const newUser = { username: "input_user", password: "234ds", avatar: "https://google.co.uk/dog.jpg", over18: true }
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .then(({ body: { user } }) => {
                expect(Object.keys(user).length).toBe(5)
                expect(typeof user.user_id).toBe("number")
            })
    })
    test('valid input body without avatar gives 200 and user with integer ID', () => {
        const newUser = { username: "input_user", password: "234ds", over18: true }
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .then(({ body: { user } }) => {
                expect(Object.keys(user).length).toBe(5)
                expect(typeof user.user_id).toBe("number")
            })
    })
    test('invalid input body with non-string username gives 400 and error with appropriate message', () => {
        const newUser = { username: true, password: "234ds", over18: true }
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("username is not in correct format")
            })
    })
    test('invalid input body with non-string password gives 400 and error with appropriate message', () => {
        const newUser = { username: "input_user", password: true, over18: true }
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("password is not in correct format")
            })
    })
    test('invalid input body with non-boolean over18 gives 400 and error with appropriate message', () => {
        const newUser = { username: "input_user", password: "234ds", over18: "true" }
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("over18 is not in correct format")
            })
    })
    test('invalid input body with non-boolean over18 gives 400 and error with appropriate message', () => {
        const newUser = { username: "input_user", password: "234ds", avatar: "www.google.co.uk", over18: true }
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("avatar url is invalid")
            })
    })
    test('user requests with preexisting username return 400 and relevant error message', () => {
        const newUser = { username: "testuser3", password: "234ds", avatar: "https://www.google.co.uk/dog.jpg", over18: true }
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("username already exists in database")
            })
    })
})

describe('POST /api/cocktails', () => {
    test("correct cocktail gives 200 and echos back cocktail body from database with cocktail ID", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/2/cocktails')
            .send(newCocktail)
            .expect(200)
            .then(({ body: { cocktail } }) => {
                expect(Object.keys(cocktail).length).toBe(39)
                expect(cocktail).toMatchObject({
                    cocktail_id: expect.any(Number),
                    linked_user_id: expect.any(Number),
                    instructions: expect.any(String),
                    alcoholic: expect.any(Boolean),
                    title: expect.any(String),
                    category: expect.any(String),
                    ingredient1: expect.any(String),
                    measure1: expect.any(String),
                    created_at: expect.any(String),
                })
            })
    })
    test("invalid user_id gives 400 and appropriate error message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/test/cocktails')
            .send(newCocktail)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("user_id is invalid")

            })
    })
    test("valid but not present user_id gives 400 and appropriate error message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/20/cocktails')
            .send(newCocktail)
            .expect(404)
            .then(({ body: { message } }) => {
                expect(message).toBe("user_id does not exist in database")

            })
    })
    test("missing title causes 400 and appropriate message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": null,
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/1/cocktails')
            .send(newCocktail)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("title is missing")

            })
    })
    test("invalid title causes 400 and appropriate message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": true,
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/1/cocktails')
            .send(newCocktail)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("title is invalid")

            })
    })
    test("missing category causes 400 and appropriate message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": null,
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/1/cocktails')
            .send(newCocktail)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("category is missing")

            })
    })
    test("invalid category causes 400 and appropriate message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": true,
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/1/cocktails')
            .send(newCocktail)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("category is invalid")

            })
    })
    test("missing alcoholic causes 400 and appropriate message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": null,
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/1/cocktails')
            .send(newCocktail)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("alcoholic is missing")

            })
    })
    test("invalid alcoholic causes 400 and appropriate message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": true,
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/1/cocktails')
            .send(newCocktail)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("alcoholic is invalid")

            })
    })
    test("missing instructions causes 400 and appropriate message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": null,
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/1/cocktails')
            .send(newCocktail)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("instructions is missing")

            })
    })
    test("invalid instructions causes 400 and appropriate message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": true,
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Gin",
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/1/cocktails')
            .send(newCocktail)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("instructions is invalid")

            })
    })
    test("invalid non-critical field causes 400 and appropriate message", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": true,
            "strIngredient2": "Grenadine",
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/1/cocktails')
            .send(newCocktail)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("ingredient1 is invalid")

            })
    })
    test("missing non-critical field causes 200 and returns cocktail object with cocktail_id", () => {
        const newCocktail = {
            "idDrink": "17225",
            "strDrink": "Ace",
            "strDrinkAlternate": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Martini Glass",
            "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
            "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cu??lelos sobre un vaso enfriado.",
            "strInstructionsDE": "Alle Zutaten in einem Cocktailshaker mit Eis sch??tteln und dann in einem kalten Glas abseihen.",
            "strInstructionsFR": null,
            "strInstructionsIT": "Shakerare tutti gli ingredienti in uno shaker e ghiaccio, quindi filtrare in un bicchiere freddo.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
            "strIngredient1": "Grenadine",
            "strIngredient2": null,
            "strIngredient3": "Heavy cream",
            "strIngredient4": "Milk",
            "strIngredient5": "Egg White",
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "2 shots ",
            "strMeasure2": "1\/2 shot ",
            "strMeasure3": "1\/2 shot ",
            "strMeasure4": "1\/2 shot",
            "strMeasure5": "1\/2 Fresh",
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strImageSource": null,
            "strImageAttribution": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-09-07 22:05:06"
        }
        return request(app)
            .post('/api/users/1/cocktails')
            .send(newCocktail)
            .expect(200)
            .then(({ body: { cocktail } }) => {
                expect(Object.keys(cocktail).length).toBe(39)
                expect(cocktail).toMatchObject({
                    cocktail_id: expect.any(Number),
                    linked_user_id: expect.any(Number),
                    instructions: expect.any(String),
                    alcoholic: expect.any(Boolean),
                    title: expect.any(String),
                    category: expect.any(String),
                    ingredient1: expect.any(String),
                    measure1: expect.any(String),
                    created_at: expect.any(String),
                })
            })
    })
})

describe('GET /api/users/:username', () => {
    test('valid username receive 200 and show user object', () => {
        return request(app)
            .get('/api/users/u/testuser1')
            .expect(200)
            .then(({ body: { user } }) => {
                expect(user).toEqual({
                    "user_id": 1,
                    "username": "testuser1",
                    "password": "pass123",
                    "avatar": 'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
                    "over18": true
                }
                )

            })
    })
    test('testuser7 not found, return 404 error', () => {
        return request(app)
            .get('/api/users/u/testuser7')
            .expect(404)
            .then(({ body: { message } }) => {
                expect(message).toBe("username not found in database")

            })
    })
})


describe('GET cocktails by user_id gives 200 status', () => {
    test('valid user_id gives coctails related to id', () => {
        return request(app)
            .get('/api/users/1/cocktails')
            .expect(200)
            .then(({ body: { cocktails } }) => {
                cocktails.forEach((cocktail) => {
                    expect(cocktail.linked_user_id).toBe(1)
                    expect(cocktail).toMatchObject({
                        cocktail_id: expect.any(Number),
                        linked_user_id: expect.any(Number),
                        instructions: expect.any(String),
                        alcoholic: expect.any(Boolean),
                        title: expect.any(String),
                        category: expect.any(String),
                        ingredient1: expect.any(String),
                        measure1: expect.any(String),
                        created_at: expect.any(String),
                    })
                })
            })

    })
    test('invalid userId when not a number 400 and meaningful message', () => {
        return request(app)
            .get('/api/users/asa/cocktails')
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("user_id is invalid")
            })
    })
    test('user_id is valid but not in database, gives 404 error and meaningful message', () => {
        return request(app)
            .get('/api/users/10/cocktails')
            .expect(404)
            .then(({ body: { message } }) => {
                expect(message).toBe("user_id not found in database")
            })
    })
})




describe('GET /api/users/:user_id', () => {
    test('valid username receive 200 and show user object', () => {
        return request(app)
            .get('/api/users/i/1')
            .expect(200)
            .then(({ body: { user } }) => {
                expect(user).toEqual({
                    "user_id": 1,
                    "username": "testuser1",
                    "password": "pass123",
                    "avatar": 'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
                    "over18": true
                }
                )

            })
    })
    test('user_id is invalid, gives 400 and meaningful message', () => {
        return request(app)
            .get('/api/users/i/POLO')
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("user_id is invalid")

            })
    })
    test('user_id is valid, but not in database gives 404 and meaningful message', () => {
        return request(app)
            .get('/api/users/i/20')
            .expect(404)
            .then(({ body: { message } }) => {
                expect(message).toBe("user_id not found in database")

            })
    })
})

describe('delete cocktail by cocktail_id', () => {
    test('delete cocktail by cocktail id returns 204', () => {
        return request(app)
            .delete('/api/cocktails/1')
            .expect(204)
    })
    test('cocktail_id is invalid, gives 400 and meaningful message', () => {
        return request(app)
            .delete('/api/cocktails/polo')
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("cocktail_id is invalid")

            })
    })
    test('cocktail_id is valid, but not in database gives 404 and meaningful message', () => {
        return request(app)
            .delete('/api/cocktails/200')
            .expect(404)
            .then(({ body: { message } }) => {
                expect(message).toBe("cocktail_id does not exist in database")

            })
    })
})

describe('PATCH /api/users/:user_id', () => {
    test('if user posts a new password, gives 202, updates successfully, returning new user object', () => {
        const userObject = {
            "password": "n3wp455w0rd",
        }

        return request(app)
            .patch('/api/users/i/1')
            .send(userObject)
            .expect(202)
            .then(({ body: { user } }) => {
                expect(user.user_id).toBe(1)
                expect(user.password).toBe("n3wp455w0rd")
                expect(user.avatar).toBe('https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953')
                expect(user.over18).toBe(true)
            })
    })
    test('if user posts a new password and/or avatar, gives 202, updates successfully, returning new user object', () => {
        const userObject = {
            "password": "n3wp455w0rd",
            "avatar":"https://www.google.co.uk/dog.jpg"
        }

        return request(app)
            .patch('/api/users/i/1')
            .send(userObject)
            .expect(202)
            .then(({ body: { user } }) => {
                expect(user.user_id).toBe(1)
                expect(user.password).toBe("n3wp455w0rd")
                expect(user.avatar).toBe("https://www.google.co.uk/dog.jpg")
                expect(user.over18).toBe(true)
            })
    })
    test('if user posts a new avatar and/or over18, gives 202, updates successfully, returning new user object', () => {
        const userObject = {
            "avatar":"https://www.google.co.uk/dog.jpg",
            "over18": false
        }

        return request(app)
            .patch('/api/users/i/1')
            .send(userObject)
            .expect(202)
            .then(({ body: { user } }) => {
                expect(user.user_id).toBe(1)
                expect(user.password).toBe("pass123")
                expect(user.avatar).toBe("https://www.google.co.uk/dog.jpg")
                expect(user.over18).toBe(false)
            })
    })
    test('if user posts a new avatar and/or over18 and/or password, gives 202, updates successfully, returning new user object', () => {
        const userObject = {
            "password": "n3wp455w0rd",
            "avatar":"https://www.google.co.uk/dog.jpg",
            "over18": false
        }

        return request(app)
            .patch('/api/users/i/1')
            .send(userObject)
            .expect(202)
            .then(({ body: { user } }) => {
                expect(user.user_id).toBe(1)
                expect(user.password).toBe("n3wp455w0rd")
                expect(user.avatar).toBe("https://www.google.co.uk/dog.jpg")
                expect(user.over18).toBe(false)
            })
    })
    test('if user posts a new avatar only gives 202, updates successfully, returning new user object', () => {
        const userObject = {
            "avatar":"https://www.google.co.uk/dog.jpg",
        }

        return request(app)
            .patch('/api/users/i/1')
            .send(userObject)
            .expect(202)
            .then(({ body: { user } }) => {
                expect(user.user_id).toBe(1)
                expect(user.password).toBe("pass123")
                expect(user.avatar).toBe("https://www.google.co.uk/dog.jpg")
                expect(user.over18).toBe(true)
            })
    })
    test('if user posts a new over18 only gives 202, updates successfully, returning new user object', () => {
        const userObject = {
            "over18": false
        }
        return request(app)
            .patch('/api/users/i/1')
            .send(userObject)
            .expect(202)
            .then(({ body: { user } }) => {
                expect(user.user_id).toBe(1)
                expect(user.password).toBe("pass123")
                expect(user.avatar).toBe('https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953')
                expect(user.over18).toBe(false)
            })
    })
    test('if user posts a new password and over18 gives 202, updates successfully, returning new user object', () => {
        const userObject = {
            "password": "n3wp455w0rd",
            "over18": false
        }
        return request(app)
            .patch('/api/users/i/1')
            .send(userObject)
            .expect(202)
            .then(({ body: { user } }) => {
                expect(user.user_id).toBe(1)
                expect(user.password).toBe("n3wp455w0rd")
                expect(user.avatar).toBe('https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953')
                expect(user.over18).toBe(false)
            })
    })
    test('if user posts an invalid password gives 400, returning meaningful message to user', () => {
        const userObject = {
            "password": true
        }
        return request(app)
            .patch('/api/users/i/1')
            .send(userObject)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("password is not in correct format")
            })
    })
    test('if user posts an invalid avatar gives 400, returning meaningful message to user', () => {
        const userObject = {
            "avatar": "www.google.co.uk"
        }
        return request(app)
            .patch('/api/users/i/1')
            .send(userObject)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("avatar url is invalid")
            })
    })
    test('if user posts an invalid over18 gives 400, returning meaningful message to user', () => {
        const userObject = {
            "over18": "true"
        }
        return request(app)
            .patch('/api/users/i/1')
            .send(userObject)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("over18 is not in correct format")
            })
    })
    test('if user_id is invalid gives 400, returning meaningful message to user', () => {
        const userObject = {
            password: "newpassword1"
        }
        return request(app)
            .patch('/api/users/i/polo')
            .send(userObject)
            .expect(400)
            .then(({ body: { message } }) => {
                expect(message).toBe("user_id is invalid")
            })
    })
    test('if user_id is valid but not in database 404, returning meaningful message to user', () => {
        const userObject = {
            password: "newpassword1"
        }
        return request(app)
            .patch('/api/users/i/25')
            .send(userObject)
            .expect(404)
            .then(({ body: { message } }) => {
                expect(message).toBe("user_id not found in database")
            })
    })
})

