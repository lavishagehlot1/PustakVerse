const cloudinary = require("cloudinary").v2;

cloudinary.config({             //This tells your backend:--“Connect to my Cloudinary account using these credentials”
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

console.log("Cloudinary Key:", process.env.CLOUD_API_KEY);
console.log("Cloudinary Secret:", process.env.CLOUD_API_SECRET);


module.exports = cloudinary;
