const express=require('express');
const router=express.Router();


//import route files
const authRoute=require('./authRoutes');

//attach routes with prefixes
router.use('/auth',authRoute);

module.exports=router;