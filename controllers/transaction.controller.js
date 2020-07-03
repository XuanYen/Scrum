const Book = require("../models/book.model.js");
const User = require("../models/user.model.js");
const Transaction = require("../models/transaction.model.js");
module.exports.index=async (req,res)=>{
    var books = await Book.find();
    var users = await User.find();
    var transactions = await Transaction.find();
    var changetrans=transactions.map(trans=>{
        let sharer=users.find(user=>user._id==trans.sharerid);
        let book=books.find(book=>book._id==trans.bookid);
        let receiver=users.find(user=>user._id==trans.receiverid);
        let time= trans.time;
        var result={ title: book.title,sharer: sharer.username, receiver: receiver.username, time: time}
        return result;
    })
    res.render("transactions/index",{
        transactions: changetrans,
        books,
        users
      })
}
