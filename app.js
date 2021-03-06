const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res) =>{
    res.json({
        message : 'Welcome to API'
    });
});

app.post('/api/posts',verifyToken, (req,res) =>{
    jwt.verify(req.token,'secretkey',(err,authData) => {
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message : 'Post Created',
                authData
            });
        }
    })
});

app.post('/api/login',(req,res) =>{
    //Mock user
    const user = {
        id : 1,
        username : 'akkas',
        email : 'brad@gmail.com'
    }

    jwt.sign({user},'secretkey',{expiresIn : '30s'}, (err,token) =>{
        res.json({
            token
        })
    });
});

//Verify Token
function verifyToken(req,res,next){
    //Get the auth header value
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        console.log('Header received'+JSON.stringify(bearerHeader));
        const bearer = bearerHeader.split(' ');
        //Getting token from the array
        const bearerToken = bearer[1];
        //setting Token
        req.token = bearerToken;
        next();

    } else {
        res.sendStatus(403);
    }
}

app.listen(5000,()=> console.log('Server running on Port 5000'));
