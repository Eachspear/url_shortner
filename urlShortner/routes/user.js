const express=require("express");
const router=express.Router();
const {postUser,loginUser}=require("../controller/user")
router.post('/',postUser);
router.post('/login',loginUser);

module.exports=router;