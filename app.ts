import express from "express";

const server = express();

server.get('/*', (req,res)=>{
    console.log(req.url);
    res.status(200).send("Hello world typescript");
})

server.listen(3000, ()=>{
    console.log("Server is listening to port 3000");
})



