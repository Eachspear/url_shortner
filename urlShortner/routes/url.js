const express=require("express");
const route=express.Router();
const {shorturl}=require("../controller/url")
route.post("/",shorturl);
module.exports=route