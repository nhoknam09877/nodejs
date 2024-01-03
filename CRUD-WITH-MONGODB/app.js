const express = require('express')
const blogRouter =require('./routes/BlogRoutes')
const app= express()

app.use(express.json())
app.use("/api/blogs",blogRouter)

app.listen(3001,()=>{
    console.log("port 3001")
})


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/your-database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports=app