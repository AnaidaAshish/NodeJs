import express ,{json} from "express";
import allRoutes from './routes/index.js'
import dotenv from "dotenv";

const app = express();
app.use(express.json())
dotenv.config()

app.get("/",(req,res)=>{
    res.send("Home Page");
});


app.use('/api/v1',allRoutes)
app.listen(process.env.PORT,()=>{
    console.log("The server is running on port 8000")
});