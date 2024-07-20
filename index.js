require("dotenv").config()
const express = require("express");
const app = express();
app.set("view engine","hbs");
app.use(express.static("static"));
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/",(req,res)=>{
    if(req.body.user==process.env.USER&&req.body.password==process.env.PASSWORD){
        res.render("main_dashboard.hbs.html")
    }else{
        res.render("index",{error:true,message:"User or Password not matched!"})
    }
})


app.listen(3000||process.env.PORT)
