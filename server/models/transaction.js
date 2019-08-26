var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  ProductList : [
    {
        Product :   {
              type: Schema.Types.ObjectId, 
              ref: 'Product',
          },
          quantity : {
              type : Number
          }
    }
  ],
  User : { type: Schema.Types.ObjectId, ref : 'User' },
  totalHarga : {
      type : Number
  },
  status : {
      type : String,
      default : 'first'
  },
  alamat : {
      type : String,
  }
},{timestamps : {  createdAt : 'created_at' }});

let Transaction = mongoose.model('Transaction' , TransactionSchema)


module.exports = Transaction
