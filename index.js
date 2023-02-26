const express = require("express")
require("./db/config")
const cors = require("cors")
const User = require("./db/User")
const Product = require('./db/Product')
const app = express()

app.use(express.json())
app.use(cors())

app.post("/register", async (req,resp)=>{
    const user = User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    resp.send(result)
})

app.post("/login",async (req,resp)=>{

    if (req.body.email && req.body.password) {
        const user = await User.findOne(req.body).select("-password")
        if (user) {
            resp.send(user)
        } else {
            resp.send({result:"No User Found"})
        }
    } else {
        resp.send({result:"No User Found"})
    }
    console.warn(req.body)
})

app.post('/add-product',async (req,resp) => {
    let product = Product(req.body)
    let result = await product.save()
    resp.send(result)
})

app.listen(5000)