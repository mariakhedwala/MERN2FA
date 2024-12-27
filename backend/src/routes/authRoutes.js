import { Router } from "express";
import passport from "passport";
import { register, login, logout, authStatus, setUp2FA, verify2FA, reset2FA } from "../controllers/authController.js";

const router = Router();

//Registration route
router.post("/register", register)

//Login route
router.post("/login", passport.authenticate("local"), login)

//Auth status route
router.get("/status", authStatus)

//Logout route
router.post("/logout", logout)

//2Fa setup
router.post("/2fa/setup", (req, res, next) => {
    if (req.isAuthenticated) return next();
    res.status(401).json({ message: "Unauthorized" });
}, setUp2FA)

//verify ÷//////route
router.post("/2Fa/verify", (req, res, next) => {
    if (req.isAuthenticated) return next();
    res.status(401).json({ message: "Unauthorized" });
}, verify2FA)

//Logout route
router.post("/2Fa/reset", (req, res, next) => {
    if (req.isAuthenticated) return next();
    res.status(401).json({ message: "Unauthorized" });
}, reset2FA)

export default router;

