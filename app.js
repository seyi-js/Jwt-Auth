const express = require('express');
const PORT = process.env.PORT || 8080
const app = express();
const mongoose = require('mongoose');



app.get('/', (req, res) => {
  res.send('<h1>HEROKU Powered By <b>ADEBAYO SAMUEL OLUWASEYI</b></h1>')
})







app.listen(PORT, console.log(`Server started on port ${PORT}`));
