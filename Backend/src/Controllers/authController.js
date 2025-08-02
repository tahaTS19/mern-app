import User from "../../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function registerUser(req, res) {
  try {
    const {name, email, password} = req.body;

    const user = await User.findOne({email});
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already exists"
      })
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name, email, password: hashPassword
    })

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Account Created Successfully"
    })

  } catch (error) {
    console.log("Error in Signup Controller", error);
    return res.status(500).json({
      success: false,
      message: "Error in Adding User"
    })
  }
};

export async function loginUser (req, res) {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      })
    }

    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword) {
      return res.status(401).json({
        success: false,
        message: "Wrong Credentials"
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY , {
      expiresIn: "30m",
    });

    res.cookie('token', token, { httpOnly: true, maxAge: 1800000, secure:true, sameSite: "Strict"})

    return res.status(200).json({
      success: true,
      token,
      user: {name: user.name},
      message: "Logged in Successfully"
    });

  } catch (error) {
    console.log("Error in Login Controller", error);
    return res.status(500).json({
      success: false,
      message: "Error in Login"
    });
  }
}; 