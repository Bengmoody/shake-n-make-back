const express=require('express')
const db = require('./db/index')
const {updateUserByUserId,removeCocktailByCocktailId, selectUserbyUserId, selectCocktailsByUserId, selectUsers,selectCocktails,addUser,addCocktail, selectUserByUsername, fetchJson} = require('./controllers')
const app=express();

app.use(express.json())

app.get('/api/users',selectUsers)
app.get('/api/cocktails',selectCocktails)
app.post('/api/users',addUser)
app.get('/api/users/i/:user_id',selectUserbyUserId)
app.post('/api/users/:user_id/cocktails',addCocktail)
app.get('/api/users/u/:username',selectUserByUsername)
app.get('/api/users/:user_id/cocktails',selectCocktailsByUserId)
app.delete('/api/cocktails/:cocktail_id', removeCocktailByCocktailId)
app.patch('/api/users/i/:user_id', updateUserByUserId)
app.get('/',fetchJson)



app.use((err,req,res,next) => {
    if (err.msg !== undefined) {
        res.status(err.status).send({message:err.msg})
    } else {
        next(err)
    }
})
app.use((err,req,res,next) => {
    if (err.code === "22P02") {
        res.status(400).send({message: `${err.propName} is invalid`})
    } else if (err.code === "23503") {
        res.status(404).send({message: `${err.propName} does not exist in database`})
    }
})

module.exports=app