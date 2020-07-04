const User = require("../models/user.model.js");
var cloudinary = require('cloudinary').v2;
require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});
module.exports.profile=async (req,res)=>{
    var user=await User.findById({_id: req.signedCookies.userId});
    if(!user.avatar){  
        await User.findByIdAndUpdate(req.signedCookies.userId,{avatar: "https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"})
    }
    res.render('profile/index',{user: user})
};
module.exports.postProfile=async (req,res)=>{
    let file = await cloudinary.uploader.upload(req.file.path);
    const fs = require('fs')
    fs.unlinkSync(req.file.path);
    await User.findByIdAndUpdate(req.signedCookies.userId,{username: req.body.username, password: req.body.password, email: req.body.email, phone: req.body.phone, avatar: file.url})
    res.redirect('/profile')
}