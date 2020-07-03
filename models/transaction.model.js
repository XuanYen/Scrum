var mongoose=require('mongoose');

var transactionSchema = new mongoose.Schema({
    sharerid: String,
    receiverid: String,
    bookid: String,
    time: String
});

var Transaction= mongoose.model('Transaction', transactionSchema,'transactions');
module.exports=Transaction;
