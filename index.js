// console.log("Successfully started")
// 1. ejs
// const express = require("express");
// const app = express();

// // set the view engine
// app.set('view engine', 'ejs');

// // render the pages with ejs extension

// // home page
// app.get('/', (req, res)=>{
//     var mascots = [
//         { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
//         { name: 'Tux', organization: "Linux", birth_year: 1996},
//         { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
//       ];
//     var tagline = "No programming concept is complete without a cute animal mascot.";
//     var variable = "Top mascots";
//     res.render('pages/index', {
//     mascots: mascots,
//     tagline: tagline,
//     variable : variable
//     });
// })

// //about page
// app.get('/about', (req, res)=>{
//     res.render('pages/about');
// })

// app.listen("1234");
// console.log("Server listening at port 1234");


// // 2. restful api + express

// const express = require('express');
// const app = express();
// var user = require('./user.js');
// const userList = user.userList();


// app.use(express.json())
// app.get('/', (req, res)=>{
//     //res.send(`<h1> Welcome </h1>`);
//     res.send(`<a href = '/users'> Users</a>`)
// })

// // display all users
// app.get('/users' , (req, res)=>{
//     res.send(userList);
// })

// //display a particular user
// app.get('/users/:id', (req, res)=>{
//     var id = req.params.id;
//     var f = 0;
//     for(let i = 0;i<userList.length;i++)
//     {
//         if(userList[i].id == id){
//             res.send(userList[i]);
//             f = 1;
//             break;
//         }
//     }

//     if(f==0)
//         res.send('User with id = '+id+ ' not found');
// })

// // add a user
// app.post('/addUser',(req, res)=>{
//     var n = {
//         id :req.body.id,
//         name : req.body.name,
//         age : req.body.age,
//         branch : req.body.branch
//     }

//     userList.push(n);
//     res.send('Added successfully');
// })

// //update a user

// app.put('/updateUser/:id', (req, res)=>{
//     var id = req.params.id;
//     var f = 0;
//     for(let i = 0;i<userList.length;i++)
//     {
//         if(id == userList[i].id)
//         {
//             userList[i].name = req.body.name;
//             userList[i].age = req.body.age;

//             res.send("Update success \n"+userList[i]);
//             f = 1;
//             break;
//         }
//     }

//     if(f==0)
//         res.send('User with id = '+id+ ' not found');
// })

// // delete user based on id
// app.delete('/deleteUser/:id', (req, res)=>{
//     var id = req.params.id;
//     var f = 0;
//     for(let i = 0;i<userList.length;i++)
//     {
//         if(id == userList[i].id)
//         {
//             userList.splice(i,1);
//             res.send(`<h4>Delete success</h4>`);
//             f = 1;
//             break;
//         }
//     }
//     if(f==0) res.send('User not found')
// })


// app.listen("1234", ()=>{
//     console.log("Server listening at port 1234");
// });



// connecting mongo with front end
// step 1 install mongose
// create connection
// use the connection to create schema
// create collection 
// create documents 

const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();

const mongoose = require('mongoose');

if(typeof localStorage==="undefined" || localStorage === null)
{
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

// create connection

mongoose.connect('mongodb://localhost:27017/m_ejs', { useNewUrlParser: true ,useUnifiedTopology: true}).
then(()=>{
    console.log("Successful")
}).catch((err)=>{
    console.log(err)
})

const con = mongoose.connection;
app.use(express.json())

const studentRouter = require('./routes/students');
app.use('/students', studentRouter);

function middle(req, res, next)
{
    const getToken = localStorage.getItem('token');
    try{
        jwt.verify(getToken, 'secret');
    }
    catch(err)
    {
        res.send('Login failed --- login first');
    }
    next();
}

app.get('/login', (req, res)=>{

    var token = jwt.sign({foo:'bar'}, 'secret');
    localStorage.setItem('token', token);

    res.send('Login Success');
})


app.get('/',middle, (req, res)=>{
    localStorage.removeItem('token');
    res.send("Welcome");
})

app.listen("1234");
console.log("Server listening at port 1234");