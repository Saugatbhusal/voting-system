const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/Employee')


const app= express()
app.use(express.json())
app.use(cors())

const userRoute = require('./routes/userRoute')


// mongoose.connect("mongodb://localhost:27017/employee");
mongoose.connect("mongodb://127.0.0.1:27017/employee", { useNewUrlParser: true, useUnifiedTopology: true });


app.post('/register',(req, res)=>{
EmployeeModel.create(req.body).then(employees=>res.json(employees))
.catch(err => res.json(err))
})



app.listen(3001, ()=>{
    console.log("server is running")
})

app.use(userRoute)