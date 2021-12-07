const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());//parsing form data to create contatc//app.use middleware

app.use(express.static('assets'));//express.static inbuilt



// //middlleware 1
// app.use(function(req,res,next){
// console.log('middleware1 called');
// next();


// });
// //middleware2
// app.use(function(req,res,next){
// console.log('middleware2 called');
// next();

// });
var contactList = [
    {
       name: "Akshay",
        phone:"1234"
    },
    {
        name:"darshan",
        phone:"123"
    },
    {
        name:"nanded",
        phone:"7890"
    }
]

app.get('/',function(req,res){
    // console.log(__dirname);

    // 
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        
        return res.render('home',{
            title:"my contacts List",
            contact_list:contacts
        });
    });


    
});
app.get('/try',function(req,res){
    // console.log(__dirname);

    // tried here
    return res.render('try',{title:"our play"});
});

app.post('/create-contact',function(req,res){//here mwe need middle-ware

// console.log(req.body);
// console.log(req.body.name);//for checking how form datat is send to add it to cinatclist
// console.log(req.body.phone);
// contactList.push({
//          name:req.body.name,
//          phone:req.body.phone
// });
//contactList.push(req.body);

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, function(err,newContact){
        if(err){console.log('error in creatig contact');
        return; }

        console.log('****',newContact);
       return  res.redirect('back');
    } );
   
//  return res.redirect('/');




});//form filled ->submit->action route->redirected

app.get('/delete-contact',function(req,res){
// get id from qery in url 
let id =req.query.id;

// find the contact in database using id and delete 
   Contact.findByIdAndDelete(id, function(err){
if(err){
     console.log('error in deleteing an object from database');
     return;
      }
      return res.redirect('back');

   });
  
});





app.listen (port,function(err){
    if(err)
           {

        console.log('Eroor in running ser', err);

    }
    console.log('My express server set up on Port:', port);

})
