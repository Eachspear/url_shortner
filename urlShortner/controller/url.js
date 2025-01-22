const{nanoid}=require("nanoid");
const url=require("../model/url")
async function shorturl(req,res){
const body=req.body;
if(!body.url)
return res.status(400).json({err:"url required"})
const shortID=nanoid(8);
await url.create({
    
    shortId:shortID,
    redirectURL:body.url,
    visitHistory:[],
    createdBy:req.user._id
});
return res.render("home",{
    id:shortID
})}

module.exports={
    shorturl
}