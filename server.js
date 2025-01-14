require('dotenv').config()
const express=require("express"),
    app=express(),
	bodyParser=require("body-parser"),
	mongoose=require("mongoose"),
	passport=require('passport'),
	LocalStrategy=require('passport-local'),
    passportLocalMongoose=require('passport-local-mongoose'),
	dbUrl=process.env.DB_URL||"mongodb://localhost:27017/gnss_india";

//Database connection
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
.then(()=>console.log("connected to DB!"))
.catch(error=>console.log(error.message));

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"))

const secret=process.env.SECRET;
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.get("/",(req,res)=>{
    res.render("home")
})

app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log("Server Has Started Listening!!!")
});