import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token:{
        type: String
    }
})

const User = mongoose.model("User", userSchema);

export default User
