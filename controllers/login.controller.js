const User = require("../models/user.model.js");
module.exports.login=(req,res)=>res.render('login/index');
module.exports.postLogin=async (req,res)=>{  
    var phone=req.body.phone;
    var password=req.body.password;
    var user=await User.findOne({phone});
    console.log(user);
    /*if(!user){
        res.render('auth/login',{
            errors:[
                'User does not exit.'
            ],
            values: req.body
        });
        return;
    }
    var temp=bcrypt.compareSync(user.password, hash);
    if(!temp){
        wrongLoginCount=wrongLoginCount+1;
        await User.findByIdAndUpdate(user._id,{wrongLoginCount: wrongLoginCount})
          res.render('auth/login',{
                errors: [
                    'Wrong password'
                ],
                values: req.body
                });
        return;
    }*/
    res.redirect('/');
}