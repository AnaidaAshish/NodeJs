const myHttp = require("http");


const server = myHttp.createServer((req,res) =>{
    if(req.method == "GET" && req.url == "/"){
       return  res.end("Hello")
    }else{
        return res.end("URL not found!!")
    }
});


server.listen(8000,()=>{
console.log("Inside port 8000")
})