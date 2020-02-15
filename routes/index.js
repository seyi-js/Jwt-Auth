const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')


const User = require('../models/User');

//verifyToken
function verifyToken(req,res,next) {
//get Auth Header Value
const bearerHeader = req.headers['authorization'];
if(typeof bearerHeader !== 'undefined'){
const bearer = bearerHeader.split(' ');
const bearerToken = bearer[1];
req.token = bearerToken
next();
} else {
    res.sendStatus(403)
}
}

//Protected Route
router.post('/api/posts', verifyToken, (req,res)=> {
    jwt.verify(req.token, 'secretkey', (err, authData)=> {
        if(err) {
            res.sendStatus(403)
        }else {
            res.json({message: 'Post Created...', authData})
        }
    });
   
});

router.get('/api', (req,res)=> {
    res.json({msg: 'Welcome'})
});

router.post('/api/login', (req,res)=> {
    //Mock user
    user = {
        id: 1,
        username :"samuel",
        // email: "samuel@username.com",
        password: 'seyi'
    }
    jwt.sign({user}, 'secretkey',{expiresIn: '30s'}, (err, token) =>{
        res.json({
            token
        })
    });
});

router.get('/login', (req,res)=> {
    res.send('Hello')
})












module.exports = router