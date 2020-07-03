const Book = require("../models/book.model.js");
const User = require("../models/user.model.js");
var cloudinary = require('cloudinary').v2;
require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});
module.exports.upload=(req,res)=>res.render('books/upload');
module.exports.postUpload=async (req,res)=>{
    var user=await User.findById(req.signedCookies.userId);
    var status= "Free";
    let file = await cloudinary.uploader.upload(req.file.path);
    const fs = require('fs')
    fs.unlinkSync(req.file.path);
    req.body.cover=file.url;
    var book={
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        sharer: user.username,
        sharerid: user._id,
        status: status,
        cover: req.body.cover
    }
    await Book.create(book);
    res.redirect('/library');
};