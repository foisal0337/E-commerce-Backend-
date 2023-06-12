const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');

dotenv.config();
require('express-async-errors');
const errorhandel = require("./middelware/errorhandel");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());


 
mongoose.connect(process.env.MONGODB_URL_LOCAL)
.then(()=> console.log("Connented to the database"))
.catch((error) => console.log(error))

app.use('/api/v1/user' , require('./routers/userRouter'));
app.use('/api/v1/category' , require('./routers/categoryRouter'));
app.use('/api/v1/product' , require('./routers/productRouter'));
app.use('/api/v1/card' , require('./routers/cardRouter'));
app.use('api/v1/profile' , require("./routers/profileRouter"));

app.use(errorhandel)

app.listen(port , () =>{
    console.log(`Server listen at port ${port}`)
})