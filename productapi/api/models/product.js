const mongoose = require("mongoose");

//Creating the product schema
const productSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	name : String,
	size : String,
	Color : String,
	price : Number,
	grade: {
        type: String,
        enum : ['A','B','C'],
        default: 'A'
    },
},
{
    timestamps: true
});

// Exporting the schema as a model
module.exports = mongoose.model('Product', productSchema);