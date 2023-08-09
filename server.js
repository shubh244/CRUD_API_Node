const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

//Express MiddleWare

app.use(express.json())

//Express Middleware if you want to use form-urlencoded instead of JSON
app.use(express.urlencoded({extended:false}))


// routes

app.get('/',(req,res)=>{
    res.send('Hello Node API')
})

app.get('/blog',(req,res)=>{
    res.send('Hello Blog, My name is Shubh')
})

//Get Data from Databse
app.get('/products', async(req, res)=>{
    try{
            const products = await Product.find({});
            res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get Single Data from database, create id from params
app.get('/product/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
}
catch(error){
    res.status(500).json({message: error.message})
}
})


//Send Data to the Database
app.post('/product', async(req, res) =>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
   
})

//Update Data to the database
 app.put('/products/:id', async(req,res)=>{
    try{
        const{id} = req.params;
        const product = await Product
        .findByIdAndUpdate(id, req.body);

        //We can not find any product in the database
        if(!product){
            return res.status(404).json({message: `Can not find Product with id ${id}`})
        }
//Also get the Updated Product
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
 })

 //Delete a product from databse
 app.delete('/products/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({
                message: `can not find any product with id ${id}`
            })            
        }
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
 })


//Connect Mongo DB with Node
mongoose.
connect('mongodb+srv://shubh:shubh12345@shubhapi.8j4ej69.mongodb.net/CRUD-API?retryWrites=true&w=majority')
.then(()=>{    
    console.log("Connected to Mongo DB");
    app.listen(3000, () =>{
        console.log("Node APi is running on port 3000");
    });
})
.catch((error)=>{
    console.log(error)
})
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(3000)