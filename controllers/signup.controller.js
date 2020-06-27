const User = require("../models/user.model.js");
module.exports.signup=(req,res)=>res.render('signup/index');
module.exports.postSignup=async (req,res)=>{
    var errors=[];
    if(!req.body.username){
        errors.push("Name is required.")
    }
    if(!req.body.phone){
        errors.push("Phone is required.")
    } 
    if(!req.body.email){
        errors.push("Email is required.")
    } 
    if(!req.body.password){
        errors.push("Password is required.")
    } 
    if(errors.length){
        res.render('signup/index',{
            errors: errors,
            values: req.body
        })
        return;
    }
    await User.create(req.body);
    res.redirect('/login');
};