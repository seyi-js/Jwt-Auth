const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 8080
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken')
var authData;

const generateToken = () => {
  jwt.sign( { name:'My name is seyi'}, 'secretkey',{ expiresIn: '36s' }, (err, token) =>{
    if ( err ) console.log( err )
    console.log( token )
    authData = token
  });
}



const decode = () => {
  jwt.verify(authData, 'secretkey', (err, data)=> {
    if(err) {
       console.log(err.message)
    }else {
        console.log(data)
    }
  });
}
//IF token is tampered with message === invalid token
//IF token has Expired === jwt expired

// mongoose.connect('mongodb://localhost:process.env.MONGO_URL_PORT/jwt',{ useNewUrlParser: true }, ()=> {
//   console.log('DB connected')
// })

const User = require('./models/User');
//Process .env config
dotenv.config();

app.get('/', (req, res) => {
  res.send('<h1>HEROKU Powered By <b>ADEBAYO SAMUEL OLUWASEYI</b></h1>')
})
//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
//ROUTES

app.use('/', require('./routes/index'))

//SERVING STATIC FILES
app.use(express.static('static'));
app.use('/static', express.static('static'));
app.use(express.static(__dirname + '/static'));


//Catch all other route

app.get("*", (req, res) => {
  res.send("<h1>error 404 Page not Found</h1>");
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
