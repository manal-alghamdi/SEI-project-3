const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img:{ 
    type: String,
    default: "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" },
  utype : {
    type: String,
    required: true,
  },
  favoriteBooks: Array ,
  ireadit : Array,
  //books : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

} , {timestamps :true});



var User = mongoose.model("User", UserSchema);

// export user model
module.exports = User;
