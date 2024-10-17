export const Login = (req,res)=>{
    console.log("Inside Login Controller")
    res.send("Login Page from auth.controller.js");
};

export const Register = (req,res) =>{
    console.log(req.body,"req.body")
    console.log("Inside Register Controller");
    res.send("Register page from auth.controller.js after nodemon installation..")
}
