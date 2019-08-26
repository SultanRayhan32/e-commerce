var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    ProductList:
        [
            {
            type: Schema.Types.ObjectId, ref: 'Product',
            quantity : Number
            }
        ],
        User : {
            type: Schema.Types.ObjectId, ref: 'User',
        }
});

let Cart = mongoose.model('Cart', CartSchema)


module.exports = Cart
