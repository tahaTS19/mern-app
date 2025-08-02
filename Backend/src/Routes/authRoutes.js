import express from "express"
import middleware from "../Middleware/UserMiddleware.js";
import { loginUser, registerUser } from "../Controllers/authController.js";

const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/verify", middleware, async (req, res) => {
  return res.status(200).json({success: true, user: req.user})
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });
  res.status(200).json({ message: "Logged out" });
});

export default router;