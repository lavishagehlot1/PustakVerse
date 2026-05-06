// const userSchema = new mongoose.Schema({...})
// Creates a new Schema — a kind of blueprint or structure for how each user document will look in MongoDB.
// Inside { ... }, you describe all the fields that a user will have and their rules (type, required, etc.).


// role
// role: {
//   type: String,
//   enum: ["user", "admin"],
//   default: "user"
// }
// Defines what role the user has.
// enum restricts the possible values to only "user" or "admin".
// default: "user" means if no role is given, it automatically becomes "user".
// This is useful for permission systems (e.g., admins can do more actions).


// const UserModel = mongoose.model('user', userSchema)
// This line compiles the schema into a model.
// 'user' is the collection name (Mongoose will automatically make it plural → users in MongoDB).
// UserModel is now your main object for interacting with users — you can:
// 1-create new users: UserModel.create({...})
// 2-find users: UserModel.find()
// 3-update users: UserModel.findByIdAndUpdate()
// 4-delete users: UserModel.findByIdAndDelete()

// Hash password ka matlab hota hai password ko directly store na karke uska encrypted (irreversible) version store karna 🔐
// Simple words mein:
// 👉 Original password kabhi database mein save nahi hota
// 🔹 Why hash password?
// Agar database hack ho jaye:
// Plain password → sab kuch leak 😨
// Hashed password → unreadable hota hai 😌
// Isliye security ke liye hashing compulsory hoti hai.
//“Password hashing should be done on the backend, preferably in a Mongoose pre-save hook or inside
//  the register controller before saving the user to the database.”


const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],default:"user"
    },
    photo:{
        type:String
    },
    

    
},{timestamps:true}); // through timpestamps--automatic creation of createdAt and updatedAt fields in your MongoDB documents.

// 🔐 hash before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const UserModel=mongoose.model('user',userSchema)
module.exports=UserModel;