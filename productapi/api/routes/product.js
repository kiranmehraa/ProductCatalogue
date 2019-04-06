const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product")
const AuthUser = require("../middleware/AuthUser")

 router.get('/',(req, res,next) => {
	Product.find()
	.exec()
	.then(docs => {
		console.log(docs);
		res.json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error : err
		})
	})
});

router.get("/feature", (req, res) => {
   Product.find(req.query).then(record => res.json(record));
});


router.post('/',AuthUser,(req,res,next) => {
	const product = new Product({
 		_id : new mongoose.Types.ObjectId(),
 		name : req.body.name,
 		size : req.body.size,
	    Color : req.body.Color,
 		price : req.body.price,
 		grade : req.body.grade
	});
	//to save this in database
	product.save().then(result => {
		console.log(result)
	})
	.catch(err=> {console.log(err)})

	res.status(200).json({
       Message : "This is a Post request",
       ProductCreated : product
	});
});

router.get("/:ProductID", (req,res,next) => {
	const id = req.params.ProductID;
	//const name = req.params('name');
	Product.findById(id).exec()
	.then(doc => {
		console.log(doc);
		res.status(200).json(doc);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error : err
		});
	});
});
router.patch("/:ProductID",AuthUser,(req,res,next)=>{

 
  const id = req.params.ProductID;
	const updateOps= {};
	for(const ops of req.body)
	{
		updateOps[ops.propName]=ops.value;
	}
	Product.update({_id : id},{ $set : updateOps}, (err,result)=>{
		if (err) {
			console.log(err);
		res.status(500).json({
			error : err
		})
		}
		else
		{
			console.log(result);
		res.status(200).json(result);
		}
	})
})

router.delete("/:productID", (req,res,next) => {
	const id = req.params.productID;
	Product.remove({_id : id}).exec().then(result => {
		res.status(200).json(result);
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({
			erro : err
		})
	})
})
module.exports = router;