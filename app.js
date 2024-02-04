import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from 'cors';
// import path from 'path'
// import {fileURLToPath} from'url'

// const __filename=fileURLToPath(import.meta.url);
// const __dirname=path.dirname(__filename);

const app=express();
// app.use(express.static(path.join(__dirname,'./client/build')));
// app.use('*',function(req,res){
//     res.sendFile(path.join(__dirname,"./client/build/index.html"))
// })
app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter)
mongoose.connect(
    "mongodb+srv://deorikhiyanat:Thirtysevenmillion@cluster0.r1fe8ud.mongodb.net/Blog?retryWrites=true&w=majority"
    )
    .then(()=>app.listen(5000))
    .then(()=>console.log("Connected to database and localhost 5000")
    )
    .catch((err)=> console.log(err));
