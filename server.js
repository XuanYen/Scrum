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
mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true});


var signupRoute=require("./routes/signup.route");
var loginRoute=require("./routes/login.route");
var profileRoute=require("./routes/profile.route");
var uploadRoute=require("./routes/upload.route");
var libraryRoute=require("./routes/library.route");
var exchangeRoute=require("./routes/exchange.route");
var transactionRoute=require("./routes/transaction.route");
var authMiddleware=require("./middleware/auth.middleware");

var cookieParser = require('cookie-parser')

app.use(cookieParser(process.env.SESSION_SECRET));

app.set('view engine', 'pug');
app.set('views','./views'); 

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.get('/',(req, res)=>res.render('index',{
    name: 'Hello books'
}));

app.use('/signup', signupRoute);
app.use('/login',loginRoute);
app.use('/profile',authMiddleware.requireAuth,profileRoute);
app.use('/upload',authMiddleware.requireAuth,uploadRoute);
app.use('/library',libraryRoute);
app.use('/exchange',authMiddleware.requireAuth, exchangeRoute);
app.use('/transactions',authMiddleware.requireAuth, transactionRoute);
// listen for requests :)
app.listen(3000,()=>console.log('server listening on port'+3000));

