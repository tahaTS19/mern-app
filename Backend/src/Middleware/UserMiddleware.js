import jwt from "jsonwebtoken";
import User from "../../Models/User.js";
import dotenv from "dotenv";
dotenv.config();

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const decoded = jwt.verify(token, process.env.KEY);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const user = await User.findById({_id: decoded.id});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const newUser = {name: user.name, id: user._id}
    req.user = newUser
    next()

  } catch (error) {
    console.error("Error in user middleware", error);
    return res.status(500).json({
        success: false,
        message: "Please Login"
      });
  }
}

export default middleware;