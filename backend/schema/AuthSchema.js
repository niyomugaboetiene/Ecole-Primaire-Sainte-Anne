import mongoose from "mongoose";

const Auth_Schema = mongoose.Schema({
    UserName: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
}, { timestamps: true });

const Auth = mongoose.model("users", Auth_Schema);

export default Auth;