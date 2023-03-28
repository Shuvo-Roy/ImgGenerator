const express = require('express')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const path = require('path')

const app = express();
//enable body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//static folder path
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/openai', require('./routes/aiRoutes'))





app.listen(port, ()=> console.log(`Server port ${port}`))