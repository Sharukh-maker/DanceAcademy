const express = require("express");
const path = require("path");
const app = express();
const mongoose  = require("mongoose");
// var mongoose = require('mongoose'); fb
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true })


const port = 8000;

// Define Mongosse Schema
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    desc: String,
    address: String

});

var Contact = mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req,res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) =>{
    const params = {}
    res.status(200).render('contact.pug',params);
})

app.post('/contact', (req,res) => {
    var myData = new Contact(req.body);
    // console.log(myData)
    myData.save().then(() => {
    // console.log(res)
    res.send("This item has been saved to the database")
    }).catch(()=> {
        res.status(400).send("item was not saved to the databse")

    });
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});