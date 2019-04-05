const express = require("express");
const BodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ProductRouters = require("./api/routes/product");
const UserRouters = require("./api/routes/user");
const app = express();
dotenv.config();

//database connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//using body parser
app.use(BodyParser.urlencoded({ extended: false}));
app.use(BodyParser.json());

app.use("/products", ProductRouters);
app.use("/user",UserRouters);
// using morgan
app.use(morgan("dev"));

// Error Handeling
app.use((req, res, next)=>{
	const error = new Error("Not Found")
	error.status= 400;
	next(error);
})
app.use((error, req, res ,next) => {
	res.status(error.status || 500)
	res.json({
		error :{
		Error: error.message
	}
	});
})
module.exports= app;