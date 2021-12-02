const mongoose = require('mongoose');//instance reused if required different place 

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    phone:{
        type:String,
        required:true
    }
})

const Contact = mongoose.model('Contact',contactSchema);// conatList is collection in database

module.exports = Contact;