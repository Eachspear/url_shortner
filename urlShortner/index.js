const express=require("express");
const urlroutes=require("./routes/url");
const app=express();
const {connectToMongo}=require("./connection");
const port=8000;
const URL=require("./model/url")
connectToMongo("mongodb://localhost:27017/shortUrl")
.then(()=>{
    console.log("Database Connected");
})
app.use(express.json())
app.use("/url",urlroutes)
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
app.listen(port,()=>{
    console.log(`Listining on PORT=${port}`)
})

