require("dotenv").config()
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const SECRET = "Hello this is a super secret code dont edit. this will be use for authentication and security";
app.set("view engine","hbs");
app.use(express.static("static"));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
async function protected(req,res,next){
    try{
        let cki = req.cookies.jwt;
        let vfy = await jwt.verify(cki,SECRET);
        if(vfy){
            next()
        }else{
            res.redirect("/")
        }
    }catch(err){
        res.render("index",{error:true,message:"Login to continue"})
    }
}
app.get("/",protected,(req,res)=>{
    res.render("main_dashboard")
 })
app.get("/logout",(req,res)=>{
    res.clearCookie("jwt",{path:"/"});
    res.render("index")    
})
app.post("/",async(req,res)=>{
    if(req.body.user==process.env.USER&&req.body.password==process.env.PASSWORD){
        try{
        let tkn = await jwt.sign({user:req.body.user},SECRET,{
            expiresIn:"7d"
        })
        res.cookie("jwt",tkn,{httpOnly:true})
        res.render("main_dashboard")
        }catch(err){
            res.render("index",{error:true,message:"Failed to authenticate user"})
        }
    }else{
        res.render("index",{error:true,message:"User or Password not matched!"})
    }
})


app.get("/certificate",protected,(req,res)=>{
    res.render("certificate")
})
app.get("/institute",protected,(req,res)=>{
    res.render("institute")
})
app.get("/portal",protected,(req,res)=>{
    res.render("portal")
})
app.get("/result",protected,(req,res)=>{
    res.render("result")
})
app.get("/tssc",protected,(req,res)=>{
    res.render("tssc")
})
app.get("/admin",protected,(req,res)=>{
    res.render("admin")
})
app.get("/main_dashboard",protected,(req,res)=>{
    res.render("main_dashboard")
})
app.listen(3000||process.env.PORT)
