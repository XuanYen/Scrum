// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

var loginRoute=require("./routes/book.route");
var signupRoute=require("./routes/user.route");

var cookieParser = require('cookie-parser')

app.use(cookieParser(process.env.SESSION_SECRET));

app.set('view engine', 'pug');
app.set('views','./views'); 

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(sessionMiddleware);
app.get('/',(req, res)=>res.render('index',{
    name: 'Hello books'
}));

app.use('/login', loginRoute);
app.use('/signup', signupRoute);


// listen for requests :)
app.listen(3000,()=>console.log('server listening on port'+3000));

