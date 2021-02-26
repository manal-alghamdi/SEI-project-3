const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const bcrypt = require("bcrypt");

const BookSchema = new Schema({
  bname: String ,
  bAuthor: String ,
  bimg: String,
  bdescription: String,
  bcategory : String ,
  bReleasDate : String ,
  user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  brate:{ 
    type: [Number],
    default: [5] }

});

var Book = mongoose.model("Book", BookSchema);

// export Ticket model
module.exports = Book;