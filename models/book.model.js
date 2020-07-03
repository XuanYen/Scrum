var mongoose=require('mongoose');

var bookSchema = new mongoose.Schema({
    title: String,
    sharer: String, 
    sharerid: String,
    author: String,
    genre: String,
    description: String,
    cover: String,
    status: String
});

var Book= mongoose.model('Book', bookSchema,'books');
module.exports=Book;