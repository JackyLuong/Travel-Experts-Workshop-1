const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("img",{"extentions": ["svg","png","jpg"]}));
app.use(express.static("views",{"extensions":["html","css"]}));
app.use(express.static("js",{"extensions":["js"]}));
app.listen(8000,() => {console.log("Server Running on port 8000.")});
app.set("view engine","ejs");

app.use("/Contact",(req,res)=>
{
    res.render("Contact.ejs");
});

app.use("/Registration",(req,res)=>
{
    res.render("Registration.ejs");
});
app.use("/Vacation_Packages",(req,res) =>
{
    res.render("VacationPackages.ejs");
});

 app.use("/Home",(req,res) =>
{
    res.render("main.ejs");
});


app.use((req, res, next) =>
{
    res.status(404).sendFile(__dirname + "/views/404.ejs");
});