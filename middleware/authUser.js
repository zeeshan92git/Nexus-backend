import jwt from "jsonwebtoken";

//user auth .. middleware
const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1]; // Extract the token part

        console.log("Token received in backend:", token);
        if (!token) {
            return res.json({ success: false, message: "Not Auth Login Again" });
        }

        try {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { userId: token_decode.id }; // in controller use as const userId = req.user.userId;
            next();
        }
        catch (jwtError) {
            // Handle invalid token errors
            console.error("JWT Verification Error:", jwtError);
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }


    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};
export default authUser;