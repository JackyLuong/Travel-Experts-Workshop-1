const express = require("express");
const app = express();
const mongo = require("mongodb").MongoClient;

app.use(express.urlencoded({extended: true}));
//Reads and serves static svg,png,jpg images to be used.
app.use(express.static("img",{"extentions": ["svg","png","jpg"]}));
//Reads and serves css files to be used.
app.use(express.static("css",{"extentions": ["css"]}));
//Reads and serves js files to be used.
app.use(express.static("js",{"extensions":["js"]}));
//Displays webage in port 8000.
app.listen(8000,() => {console.log("Server Running on port 8000.")});
//Tells server to use ejs templates to serve the webpage.
app.set("view engine","ejs");

//url to direct to a local mongodb database
var url = "mongodb://localhost:27017/test";

// Variable that is used to check if the user if logged in with an account
var isLoggedIn = false;

//Serves contact page if the url extension is "/contact."
app.use("/Contact",(req,res)=>
{
    res.render("contact.ejs", {loggedIn: isLoggedIn});
});

//Serves SignIn page if the url extension is "/SignIn."
app.use("/SignUp",(req,res)=>
{
    var userArray = new Array();
    var countryArray = new Array();
    mongo.connect(url, {useNewUrlParser:true, useUnifiedTopology:true}, (err, client)=>
    {
        if(err) throw err;
        var countryDb = client.db("TravelExpertsDB");
        var countryCursor =  countryDb.collection("countries").find();
        
        var userDb = client.db("TravelExpertsDB");
        var userCursor =  userDb.collection("customers").find();
        
        countryCursor.forEach((doc,err)=>
        {
            if(err) throw err;
            countryArray.push(doc);
        }, ()=>
            {
            userCursor.forEach((doc, err)=>
            {
                if(err) throw err;
                userArray.push(doc);
            }, ()=>
            {
                client.close();
                res.render("signUp.ejs", {countries:countryArray, userProfiles:userArray, loggedIn:isLoggedIn});
            });
        });
    });
});

//Serves SignIn page if the url extension is "/SignIn."
app.use("/Login",(req,res)=>
{
    var userArray = new Array();
    mongo.connect(url, {useNewUrlParser:true, useUnifiedTopology:true}, (err, client)=>
    {
        if(err) throw err;
        var countryDb = client.db("TravelExpertsDB");
        var countryCursor =  countryDb.collection("countries").find();
        
        var userDb = client.db("TravelExpertsDB");
        var userCursor =  userDb.collection("customers").find();
        
        countryCursor.forEach((doc,err)=>
        {
            if(err) throw err;
            countryArray.push(doc);
        }, ()=>
            {
            userCursor.forEach((doc, err)=>
            {
                if(err) throw err;
                userArray.push(doc);
            }, ()=>
            {
                client.close();
                res.render("login.ejs", {userProfiles:userArray, loggedIn:isLoggedIn});
            });
        });
    });
});

//Serves VacationPackages page if the url extension is "/Vacation_Packages."
app.use("/Vacation_Packages",(req,res) =>
{
    var packageArray = new Array();
    mongo.connect(url, {useNewUrlParser:true, useUnifiedTopology:true}, (err, client)=>
    {
        if(err) throw err;

        var packagesDb = client.db("TravelExpertsDB");
        var packageCursor =  packagesDb.collection("packages").find();
        
        packageCursor.forEach((doc,err)=>
        {
            if(err) throw err;
            packageArray.push(doc);
        }, ()=>
            {
                client.close();
                console.log(packageArray[2]);
                res.render("vacationPackages.ejs", {packages:packageArray, loggedIn:isLoggedIn});
            });
    });
});

//Serves Home page if the url extension is "/Home."
 app.use("/Home",(req,res) =>
{
    res.render("main", {loggedIn: isLoggedIn});
});
//Serves profile page if the url extension is "/Account."
app.use("/Account",(req,res) =>
{
    res.render("profile", {loggedIn: isLoggedIn});
});

app.post("/SignUpDone",(req,res)=>
{
    var newUser = 
    {
        custFirstName: req.body.FirstName,
        custLastName: req.body.LastName,
        custEmail: req.body.Email,
        custPassword: req.body.Password,
        custPhone: req.body.Phone,
        custHomePhone: req.body.HomePhone,
        custStreetName: req.body.StreetName,
        custCountryName: req.body.CountryName,
        custProvinceName: req.body.ProvinceName,
        custCityName: req.body.CityName,
        custPostal: req.body.Postal,
    };

    mongo.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, (err, client)=>
    {
        if(err) throw err;
        var db = client.db("TravelExpertsDB");
        db.collection("customers").insertOne(newUser, (err,result) =>
        {
            if(err) throw err;
            console.log("item inserted");
            client.close();
        });
    });
    res.render("thanks.ejs", {loggedIn: isLoggedIn});
});

/*Serves Home page and changes the log in status to replace the sign in 
    button to view profile once the customer is logged in if the url extension is "/ValidateLogin."*/
app.use("/ValidateLogin",(req,res) =>
{
    isLoggedIn = true;
    res.render("main", {loggedIn: isLoggedIn});
});

//Serves Home page and changes the log in status to true if the url extension is "/ValidateLogin."
app.use("/SignOut",(req,res) =>
{
    isLoggedIn = false;
    res.render("main", {loggedIn: isLoggedIn});
});

//Serves 404Error page if the server can't find the page that is being request.
app.use((req, res, next) =>
{
    res.status(404).sendFile(__dirname + "/views/404.ejs");
});