const {v4:uuidv4}=require("uuid");
const User = require("../model/users");
const user=require("../routes/user");
const{setUser,getUser}=require("../service/auth")

async function postUser(req,res){
    const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/")
}
async function loginUser(req,res){
    const{name,password}=req.body;
    const checkUser=await User.findOne({name,password});
    if(!checkUser)
    return res.render("login",{
        error:"Invalid UserName or Password"
    })
    const token=setUser(checkUser)
    //res.cookie("uid",token);
        res.json(token);
    return res.redirect("/")
}
module.exports={
    postUser,
    loginUser,
}