const express = require("express");
const router = express.Router();
const mongoose =require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/Register",(req,res,next)=>{
	bcrypt.hash(req.body.password,10, (err,hash)=>{
		if(err)
		{
			//console.log(err)
			return res.status(500).json({
				error : err
			})
		}
		else
		{
			const user = new User({
				_id : new mongoose.Types.ObjectId(),
				username : req.body.username,
				password : hash
			});
			user.save().then(result=>{
				console.log(result)
				res.status(201).json({
					message : "User Created"
				})
			}).catch(err=>{
				console.log(err);
				 res.status(500).json({
				 	error :err
				})
			});
		}
	})
})

router.post("/login",(req,res,next)=> {
	User.find({ username : req.body.username}).exec().then(user => {
		if(user.length < 1)
		{
			return res.status(401).json({
				Message : "Auth Failed"
			})
		}
		bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
			if(err)
			{
				console.log(err);
				return res.status(401).json({
					Message : "Auth Failed"
				})
			}
			if(result)
			{
				const token = jwt.sign({
					username : user[0].username,
					userId : user[0]._id
				},
				process.env.JWT_key,{
					expiresIn : "1h"
				}
			);
				return res.status(200).json({
					Message : "Auth Successful",
					token : token
				})
			}
			res.status(401).json({
			Message : "Auth Failed"
				})

		})
	})
	.catch(err => {
		console.log(err)
		res.staus(401).json({
			Error : err
		})
	})
})

module.exports = router;