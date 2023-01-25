const express=require('express')
const db = require('./db/index')
const {selectUsers,selectCocktails,addUser,addCocktail} = require('./controllers')
const app=express();

app.use(express.json())

app.get('/api/users',selectUsers)
app.get('/api/cocktails',selectCocktails)
app.post('/api/users',addUser)
app.post('/api/users/:user_id/cocktails',addCocktail)

app.use((err,req,res,next) => {
    if (err.msg !== undefined) {
        res.status(err.status).send({message:err.msg})
    } else {
        next(err)
    }
})
app.use((err,req,res,next) => {
    if (err.code === "22P02") {
        res.status(400).send({message: "user_id is invalid"})
    } else if (err.code === "23503") {
        res.status(404).send({message: "user_id does not exist in database"})
    }
})

module.exports=app