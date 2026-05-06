const express=require('express');
const {loginUser, registerUser}=require('../controller/authController');
const upload=require("../middleware/multer")
const router=express.Router();

router.post('/login',loginUser)
router.post('/register',upload.single('photo'),registerUser)
module.exports=router;