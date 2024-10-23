import User from "../models/user.schema.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;

    if (!email || !password) {
      return res.send("All fields are required!!!!");
    }
    const isEmailExits = await User.findOne({ email: email });
    if (!isEmailExits) {
      return res.send("This Email does not exist,please check your email!!");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isEmailExits.password
    );
    if (!isPasswordCorrect) {
      return res.send("Password does not match!!");
    }
    console.log("Inside Login Controller");
    res.send("Login Successful");
  } catch (error) {
    res.send(error);
  }
};

export const Register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body.userData;
    // console.log(name,email,password,confirmPassword,"userDetails")
    if (!name || !email || !password || !confirmPassword) {
      return res.send("All fields are required!!!!");
    }
    if (password !== confirmPassword) {
      return res.send("Password is not same as Confirm Password!!!");
    }

    const isEmailExits = await User.findOne({ email: email });
    if (isEmailExits) {
      return res.send("This Email already exists!!");
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

    return res.send(
      "Register page from auth.controller.js after nodemon installation.."
    );
  } catch (error) {
    res.send(error);
  }
};
