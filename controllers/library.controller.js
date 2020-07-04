const Book = require("../models/book.model.js");
module.exports.index=async (req,res)=>{
    var page=parseInt(req.query.page) || 1 
    var perPage=5; 
    var start=(page-1)*perPage;
    var end=page*perPage;
    var pages=[];
    var books=await Book.find();
    var total= books.length;
    for(var i=1;i<=(books.length)/perPage+1;i++){
      pages.push(i);
    };
    books=books.slice(start,end);
    res.render('library/index',{books: books, pages, total: total})
};
module.exports.search= async (req,res)=>{
    var books=await Book.find();
    var page=parseInt(req.query.page) || 1;
    var perPage=5; 
    var start=(page-1)*perPage;
    var end=page*perPage;
    var pages=[]; 
    for(var i=1;i<=(books.length)/perPage+1;i++){
      pages.push(i);
    };
    var key=req.body.key;
    var result=books.filter(ele=>{
      return ele.title.toLowerCase().indexOf(key.toLowerCase())!=-1;
    });
    var total=result.length;
    books=result.slice(start,end);
    res.render('library/index',{books: result, pages, total: total});
}