const express = require('express')
const app = express()
const expressHandlebars = require('express-handlebars').engine;
const port=process.env.PORT || 3000

app.engine('handlebars',expressHandlebars({
    defaultLayout:'main'
}))


app.set('view engine','handlebars')
app.use(express.static(__dirname+'/public'))



app.get('/',(req,res)=>res.render('home'))
app.get('/about',(req,res)=>res.render('about'))


app.use((req,res)=>{
    
    res.status(404)
    res.render('404')
})



app.use((err,req,res,next)=>{
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.render('500')
})

app.listen(port,()=>console.log(
    `express started on http://localhost:${port};`+
    `press Ctrl-C`
))