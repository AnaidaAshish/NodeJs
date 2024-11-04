import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;

    if (!email || !password) {
      return res.json({ message: "All fields are required!!!!", success: false });
    }
    const isEmailExits = await User.findOne({ email: email });
    if (!isEmailExits) {
      return res.json({ message: "This Email does not exist", success: false });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isEmailExits.password
    );
    if (!isPasswordCorrect)
      return res.json({ message: "Password does not match", success: false });
    //set cookies
    //jwt=>json web token =>encryption
    const encryptedToken = jwt.sign({ userId: isEmailExits._id }, process.env.ENCRYPTIONSECRET)
    console.log(encryptedToken, "encryptedToken")
    res.cookie("token", encryptedToken)
    return res.json({
      message: "Login successful",
      success: true,
      userData: { email: isEmailExits.email, name: isEmailExits.userName },

    });
  }
  // console.log("Inside Login Controller");
  // res.send("Login Successful");

  catch (error) {
    return res.json({ message: error, success: false });
  }
};

export const Register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body.userData;
    // console.log(name,email,password,confirmPassword,"userDetails")
    if (!name || !email || !password || !confirmPassword) {
      return res.json({ message: "All fields are required!!!!", success: false });
    }
    if (password !== confirmPassword) {
      return res.json({ message: "Password is not same as Confirm Password!!!", success: false });
    }

    const isEmailExits = await User.findOne({ email: email });
    if (isEmailExits) {
      return res.json({ message: "This Email already exists!!", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const NewUser = new User({
      userName: name,
      email: email,
      password: hashedPassword,
    });
    console.log(NewUser, "UserData");
    const ResponseFromMongoDb = await NewUser.save();
    console.log(ResponseFromMongoDb);

    return res.json(
      { message: "Register page from auth.controller.js after nodemon installation..", success: true }
    );
  } catch (error) {
    res.json({ message: error, success: false });
  }
};