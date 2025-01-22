const express=require("express");
const app=express();
const path=require("path");
const cookieParser=require("cookie-parser");
const {loginUsersOnly}=require("./middleware/auth")
//mongoDB connection
const {connectToMongo}=require("./connection");
const port=8000;
const URL=require("./model/url")
connectToMongo("mongodb://localhost:27017/shortUrl")
.then(()=>{
    console.log("Database Connected");
})

//router
const urlroutes=require("./routes/url");
const staticRoute=require("./routes/staticRouter")
const userRoute=require("./routes/user");


//ejs engine
app.set("view engine","ejs");
app.set('views',path.resolve("./views"))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//Route uses
app.use("/url",loginUsersOnly,urlroutes)
app.use("/",staticRoute);
app.use("/user",userRoute);



app.get("/test",async (req,res)=>{
const allUrls=await URL.find({});
return res.render('home',{
    urls:allUrls
});
})
app.get('/:shortid', async (req, res) => {
    const shortid = req.params.shortid;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortid }
        );

        if (!entry) {
            console.log(`No entry found for shortid: ${shortid}`);
            return res.status(404).send('Short URL not found');
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error finding or updating the URL:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Server Port
app.listen(port,()=>{
    console.log(`Listining on PORT=${port}`)
})

