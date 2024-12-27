import bcrypt from "bcryptjs";
import User from "../models/user.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            isMfaActive: false,
        });
        console.log(newUser, "new user");
        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ error: "Error registering user", message: error })
    }
}

export const login = async (req, res) => {
    console.log("The authenticated user is ", req.user);
    res.status(200).json({
        message: "User logged in",
        username: req.user.username,
        isMfaActive: req.user.isMfaActive
    });
}
export const authStatus = async (req, res) => {
    if (req.user) {
        res.status(200).json({
            message: "User logged in",
            username: req.user.username,
            isMfaActive: req.user.isMfaActive
        })
    } else {
        res.status(401).json({ message: "Unauthorized user" });
    }
}
export const logout = async (req, res) => {
    if (!req.user) res.status(401).json({ message: "Unauthorized user" });
    req.logout((err) => {
        if (err) return res.status(400).json({ message: "User not logged in" });
        res.status(200).json({ message: "User logged out" });
    })
}
export const setUp2FA = async (req, res) => {
    try {
        console.log("The req.user is: ", req.user);
        const user = req.user;
        var secret = speakeasy.generateSecret();
        console.log("secret is ", secret);
        user.twoFactorSecret = secret.base32;
        user.isMfaActive = true;
        await user.save();
        const url = speakeasy.otpauthURL({
            secret: secret.base32,
            label: `${req.user.username}`,
            issuer: "mariashaikh.com",
            encoding: 'base32'
        });
        const qrImageUrl = await qrCode.toDataURL(url);
        res.status(200).json({
            secret: secret.base32,
            qrCode: qrImageUrl
        })
    } catch {
        res.status(500).json({ message: "Error setting 2FA" })
    }
}
export const verify2FA = async (req, res) => { }
export const reset2FA = async (req, res) => { }