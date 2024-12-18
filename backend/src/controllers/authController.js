import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const register = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
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

export const login = async (req, res) => { }
export const authStatus = async (req, res) => { }
export const logout = async (req, res) => { }
export const setUp2FA = async (req, res) => { }
export const verify2FA = async (req, res) => { }
export const reset2FA = async (req, res) => { }