import { userLogin , userRegister , userLogOut , getOppositeUsers} from "../controller/user.js";
import authUser from "../middleware/authUser.js";
import express from 'express';

const userRouter = express.Router();

userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);
userRouter.post('/logout',authUser,userLogOut);
userRouter.post('/getcollab',authUser,getOppositeUsers);

export default userRouter;

