//mongoDB connection setup
//1-- const mongoose = require("mongoose");
// This imports the Mongoose library.
// Mongoose is an ODM (Object Data Modeling) tool for MongoDB — it helps you:
// Connect to MongoDB easily.
// Define schemas & models.
// Interact with the database using JavaScript (instead of raw queries).

//2--const connectDB = async () => { ... }
//We are defining an asynchronous function named connectDB.
//Why async?
//Because connecting to a database takes time — it’s a promise-based (asynchronous) operation.

//3--mongoose.connect() tries to establish a connection to MongoDB.
//process.env.MONGO_URL
//→ This reads your MongoDB connection string from your .env file.
//Example:
//MONGO_URL=mongodb+srv://lavisha:password@cluster.mongodb.net/myDB

//4--If the connection works, this line runs:
//console.log("✅ MongoDB connected successfully");

//5-- The catch block:
// catch (error) {
//   console.error("❌ MongoDB connection error:", error.message);
//   process.exit(1);
// }
// If something goes wrong (wrong URL, internet issue, MongoDB down), it will go here.
// error.message prints the reason for the failure.
// process.exit(1) stops the Node.js app completely.
// (1 means exit with error; 0 means successful exit)
// 💡 This is useful because if your database doesn’t connect, you don’t want your app to keep running.

//6-- module.exports = connectDB;
// This exports the function so it can be used in another file (like index.js).
// Then in index.js you can just do:
// const connectDB = require("./db");
// connectDB();




const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected successfully")
    }catch(err){
        console.log("MongoDB connection error",err);
        process.exit(1);
    }
}
module.exports=connectDB;