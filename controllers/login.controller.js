const User = require("../models/user.model.js");
module.exports.login=(req,res)=>res.render('login/index');
module.exports.postLogin=async (req,res)=>{  
    var phone=req.body.phone;
    var password=req.body.password;
    var user=await User.findOne({phone}); 
    if(!phone){
        res.render('login/index',{
            errors:[
                'Phone number is required'
            ],
            values: req.body
        });
        return;
    }
    if(!user){
        res.render('login/index',{
            errors:[
                'User does not exit.'
            ],
            values: req.body
        });
        return;
    }
    if(!password){
        res.render('login/index',{
            errors:[
                'Password is required'
            ],
            values: req.body
        });
        return;
    }
    if(user.password!=password){
          res.render('login/index',{
                errors: [
                    'Wrong password'
                ],
                values: req.body
                });
        return;
    }
    res.cookie('userId', user._id,{
        signed: true
    });
    res.redirect('/');
}
module.exports.logout=(req,res)=>{
    res.cookie('userId', 0,{
        maxAge: 0
    });
    res.redirect('/');
}