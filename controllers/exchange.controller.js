const Book = require("../models/book.model.js");
const User = require("../models/user.model.js");
const Transaction = require("../models/transaction.model.js");
module.exports.index=async (req,res)=>{
    var books=await Book.find();
    var book= await Book.findById({_id: req.params.id});
    var errors=[];
    if(book.status=="Busy"){
        errors.push("Status busy. Cannot exchange!")
    }
    if(errors.length){
        res.render('library/index',{
            errors: errors,
            books: books,
            pages: []
        })
        return;
    }
    var user= await User.findById({_id: book.sharerid});
    await Book.findByIdAndUpdate(req.params.id,{status: "Busy"})
    var transaction={
        sharerid: user._id,
        receiverid: req.signedCookies.userId,
        bookid: req.params.id,
        time: new Date().toLocaleString()
    }
    await Transaction.create(transaction);
    res.render('exchange/index',{user: user});
}


