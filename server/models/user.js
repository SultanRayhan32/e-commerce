var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { HashingPassword  }  = require('../helpers');
var UserSchema = new Schema({
  username : {
      type : String,
      required : true
  },
  password : {
      type : String,
      required : true
  },
  email : {
      type : String,
      required : true,
  },
  cartList : 
    [
        {
          Product :   {
                type: Schema.Types.ObjectId, 
                ref: 'Product',
            },
            quantity : {
                type : Number
            }
        }
      
    ]
});
UserSchema.pre('save' , function(next){
    this.password = HashingPassword(this.password)
    console.log(this.password)
    next()
})

let User = mongoose.model('User' , UserSchema)


module.exports = User