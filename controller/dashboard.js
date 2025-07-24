import userModel from "../model/user.js";
import bcrypt from 'bcrypt';

const seedUsers = async (req, res) => {
    try {
        await userModel.insertMany(users);
        console.log('users added.');
        return res.json({ success: true, message: "Mock users added" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error seeding users" });
    }
};


export default seedUsers;