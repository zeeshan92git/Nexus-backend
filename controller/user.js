import userModel from "../model/user.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userRegister = async (req, res) => {
    try {
        console.log("userRegister invoked...", req.body);
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role)
            return res.json({ success: false, message: "Missing Details" });

        //validating email & password format
        if (!validator.isEmail(email))
            return res.status(400).json({ success: false, message: "Enter a valid email" });
        if (password.length < 8)
            return res.json({ success: false, message: "Enter a strong (8-character)password" });

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedpswrd = await bcrypt.hash(password, salt);

        const userData = { name, email, password: hashedpswrd, role };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        //creating token for auth...
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);// Include user id in the token payload
        console.log('data object sending from register to FE', token);
        return res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }

};
//user login
const userLogin = async (req, res) => {
    try {
        console.log("userlogin invoked...", req.body);
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        console.log(user);
        const isMatchedPW = await bcrypt.compare(password, user.password);
        if (isMatchedPW) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, token, user });
        }
        else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};
// Controller to log out user (just acknowledges logout)
const userLogOut = async (req, res) => {
    try {
        console.log("userLogOut invoked...");

        // Optionally: log user logout time or invalidate token if using token blacklist

        return res.json({ success: true, message: "Logout successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ success: false, message: "Server error during logout" });
    }
};
//get opposite users
const getOppositeUsers = async (req, res) => {
    try {
        const currentUser = await userModel.findById(req.user.userId);

        const targetRole = currentUser.role === "investor" ? "entrepreneur" : "investor";

        const others = await userModel.find({ role: targetRole }).select("-password");
 
        return res.json({ success: true, users: others });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};



export { userLogin, userRegister, userLogOut , getOppositeUsers };