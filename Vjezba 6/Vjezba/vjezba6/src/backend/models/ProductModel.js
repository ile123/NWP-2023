const mongoose  = require('mongoose');

const ProductModel = new mongoose.Schema(
    {
        name:{ type: String },
        image:{ type: String }
    }
)

const Product = mongoose.model('Product', ProductModel, 'products');

module.exports = Product;