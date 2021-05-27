const express = require("express");
const jwt = require('jsonwebtoken');

const app = express()
const router = express.Router();
const student = require('../models/student')

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


router.get('/' ,middle, async (req, res)=>{
    // res.send('Got a request');

    try {
        const ss = await student.find();
        res.json(ss);
    } catch (error) {
        res.send(`<h2>Employee Id doesnot exist</h2>`)
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const ss = await student.findById(req.params.id);
        res.json(ss);
    } catch (error) {
        res.send(`<h2>Employee Id doesnot exist</h2>`)
    }
})

router.post('/' , async (req, res)=>{
    const s = new student({
        name : req.body.name,
        age : req.body.age,
        branch : req.body.branch,
        grade : req.body.grade
    })

    try {
        const s1 = await s.save()
        res.json(s1)
    } catch (error) {
        res.send(error)
    }
})

router.put('/:id', async (req, res)=>{
    try {
        const ss = await student.findById(req.params.id);
        ss.name = req.body.name;
        ss.age = req.body.age;
        const s1 = await ss.save();
        res.json(s1);
    } catch (error) {
        res.send(`<h2>Employee Id doesnot exist</h2>`)
    }
})

router.delete('/:id', async (req, res) =>{
    try {
        const ss = await student.findById(req.params.id);
        const x =await ss.remove();
        res.send('Delete success')
    } catch (error) {
        res.send(`<h2>Employee Id doesnot exist</h2>`)
    }
})
module.exports = router;