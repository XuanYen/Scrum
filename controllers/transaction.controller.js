const Book = require("../models/book.model.js");
const User = require("../models/user.model.js");
const Transaction = require("../models/transaction.model.js");
module.exports.index=async (req,res)=>{
    var books = await Book.find();
    var users = await User.find();
    var transactions = await Transaction.find();    
    var page=parseInt(req.query.page) || 1;
    var perPage=5; 
    var start=(page-1)*perPage;
    var end=page*perPage;
    var pages=[];
    for(var i=1;i<=(transactions.length)/perPage+1;i++){
        pages.push(i);
    };
    var total= transactions.length;
    var changetrans=transactions.map(trans=>{
        let sharer=users.find(user=>user._id==trans.sharerid);
        let book=books.find(book=>book._id==trans.bookid);
        let receiver=users.find(user=>user._id==trans.receiverid);
        let time= trans.time;
        var result={ title: book.title,sharer: sharer.username, receiver: receiver.username, time: time}
        return result;
    }).slice(start,end);
    res.render("transactions/index",{
        transactions: changetrans,
        total: total,
        pages,
        books,
        users
      })
}
