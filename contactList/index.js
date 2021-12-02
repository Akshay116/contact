const express = require('express');
const path = require('path');
const port = 8000;

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
    return res.render('home',{
        title:"my contacts List",
        contact_list:contactList
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
contactList.push(req.body);
   
//  return res.redirect('/');
return res.redirect('back');



});//form filled ->submit->action route->redirected

app.get('/delete-contact',function(req,res){

let phone =req.query.phone;

let contactIndex = contactList.findIndex(contact => contact.phone == phone);

 if(contactIndex!= -1){
     contactList.splice(contactIndex,1);

 }
 return res.redirect('back');

});





app.listen (port,function(err){
    if(err)
           {

        console.log('Eroor in running ser', err);

    }
    console.log('My express server set up on Port:', port);

})
