// const User = require("../model/userSchema");
// Imports the User model you defined in model/userSchema.js. This lets you read/write user documents in MongoDB using Mongoose.

// exports.loginUser = async (req, res) => { defines and exports the login handler.
// const { email, password } = req.body; extracts email and password the client sent to POST /login.

console.log("LOGIN API HIT");
const User = require("../model/userSchema");
const cloudinary = require("../config/cloudinary");
const bcrypt=require('bcrypt');
const generateToken=require('../utils/generateToken')
//Login controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("body  login data---", req.body);

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // 🔍 COMPARE PASSWORD HERE
      const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  //Generate jwt
  const token=generateToken(user._id)

    res.status(200).json({ 
      success:true,
    token,
  user:{
    id:user._id,
    name:user.name,
    email:user.email
  }
 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Register controller
exports.registerUser = async (req, res) => {
  try {
    //Destructure fields from request body
    const { firstName, lastName, userName, email, password, photo } = req.body;
    console.log("data from frontend", req.body);
    console.log("req.file", req.file);


    //Validation for required fields
    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //check if users email is already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }

    //for photos
    let photoUrl = ""; //Creates a variable to store the final Cloudinary image URL.
    // Starts empty in case the user doesn’t upload a photo.

    if (req.file) {
                    //req.file comes from Multer (upload.single("photo")).
                    // If the user uploaded a file, we proceed to upload it to Cloudinary.
                    // If not, photoUrl remains empty.
     try{ const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,                     //req.file.mimetype → MIME type of file (e.g., image/png)
                                   // req.file.buffer → The file stored in memory by Multer
                                  // buffer.toString("base64") → Converts file into base64 string
                                 // Prepend data:image/png;base64, → Cloudinary understands this format
                                   // Why base64? Because the file is in memory, not on disk, Cloudinary can accept base64 strings directly
        { folder: "users" }         //Saves the image inside a Cloudinary folder named "users",Helps organize your images
      );

      photoUrl = uploadResult.secure_url; //uploadResult → object returned by Cloudinary after upload,secure_url → HTTPS link to the uploaded image,We store this in photoUrl to save in MongoDB
    }catch(err){
        console.log("Cloudnary uploads error:",err);
        return res.status(500).json({message:"Cloudinary upload fails",error:err.message})

    }}

    //Create new user using schema
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password,
      photo: photoUrl,
    });

    //save user to db
    await newUser.save();

    //send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
