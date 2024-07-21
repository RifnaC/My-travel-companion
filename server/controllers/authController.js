import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {sendVerificationEmail} from '../utils/nodeMailer.js';

// Register a new User
export const register = async (req, res) => {
    const { email, password } = req.body;
    console.log("helloo");
    try {
        const existingUser = await User.findOne({email});
        console.log("helloo2");
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' })
        }
        console.log("helloo3");
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password:hashedPassword });
        console.log("helloo4");
        await user.save();
        console.log("helloo5");
        await sendVerificationEmail(user);
        res.status(200).json({ message: 'Registration successful! Please check your email to verify your account.' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// verify user
export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({token});
        if(!user){
            return res.status(400).json({message: 'Invalid or expired token'});
        }
        user.isVerified = true;
        user.token = undefined;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// user login
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
        return res.status(400).json({ message: 'Please verify your email first' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
};

// protected route
export const home = (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected route' });
};

