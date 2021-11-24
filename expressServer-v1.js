const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}));
//Reads and serves static svg,png,jpg images to be used.
app.use(express.static("img",{"extentions": ["svg","png","jpg"]}));
//Reads and serves static html, and css to be used.
app.use(express.static("views",{"extensions":["html","css"]}));
//Reads and serves jQuery, scripts and the server to be used.
app.use(express.static("js",{"extensions":["js"]}));
//Displays webage in port 8000.
app.listen(8000,() => {console.log("Server Running on port 8000.")});
//Tells server to use ejs templates to serve the webpage.
app.set("view engine","ejs");

//Serves contact page if the url extension is "/contact."
app.use("/Contact",(req,res)=>
{
    res.render("Contact.ejs");
});

//Serves SignIn page if the url extension is "/SignIn."
app.use("/SignIn",(req,res)=>
{
    res.render("SignIn.ejs");
});

//Serves VacationPackages page if the url extension is "/Vacation_Packages."
app.use("/Vacation_Packages",(req,res) =>
{
    res.render("VacationPackages.ejs");
});

//Serves Home page if the url extension is "/Home."
 app.use("/Home",(req,res) =>
{
    res.render("main.ejs");
});

//Serves 404Error page if the server can't find the page that is being request.
app.use((req, res, next) =>
{
    res.status(404).sendFile(__dirname + "/views/404.ejs");
});