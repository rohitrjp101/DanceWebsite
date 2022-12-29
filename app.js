const express = require("express");
const path = require("path");
const pug = require('pug');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();
const port = 3000;

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

// Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String, 
    phone: String, 
    email: String, 
    address: String, 
    desc: String
})

// Model
const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS
// app.use(express.static('public', options))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

//PUG
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {};
    res.render('contact.pug', params);
})

app.post('/contact', (req, res)=>{

    let myData = new Contact(req.body);
    // When saving the data we have to handle a promise
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.render('contact.pug', params);
})

//START THE SERVER
app.listen(port, ()=>{
    console.log("Sever started on port 3000");
})