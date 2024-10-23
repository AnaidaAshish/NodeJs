import { model, Schema } from "mongoose";

const UserModel = new Schema({
    userName : String,
    age : Number,
    email : {type : String, required : true},
    password : String
});

const User = model("User",UserModel);
export default User;