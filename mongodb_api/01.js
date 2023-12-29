const express= require('express')
const mongoose= require('mongoose')
const bodyParse= require('body-parser')

const app= express()
const port =3000

mongoose.connect('mongodb://localhost:27017/dangkimthi')

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    qty:Number
})

const Product = mongoose.model('Product',productSchema);
app.use(bodyParse.json())

app.get('/api/products',async(req,res)=>{
    try{
        const products = await Product.find()
        res.json(products)
    } catch(error){
        res.status(500).json({error:error.message})
    }
})


app.get('/api/products/:id',async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({error:'Produc not found'})
        }
        res.json(product)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})


app.post('/api/products',async(req,res)=>{
    const{name,price,qty} = req.body
    try{
       const newProduct =new Product({name,price,qty})
       const sevedProduct = await newProduct.save()
       res.json(sevedProduct)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})



app.post('/api/products/:id',async(req,res)=>{
    const{name,price,qty} = req.body
    try{
       const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {name,price,qty},
        {new:true}
       )
       if(!updatedProduct){
        return res.status(404).json({error:'product not found'})
        
       }res.json(updatedProduct)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

app.delete('/api/products/:id',async(req,res)=>{
    try{
        const deletedProduct= await Product.findByIdAndDelete(req.params.id)
        if(!deletedProduct){
            return res.status(404).json({error:'product not found'})
        } res.json(deletedProduct)

    }catch(error){
        return res.status(404).json({error:'product not found'})
    }
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})