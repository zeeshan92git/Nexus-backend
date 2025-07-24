import { getUserProfile , updateUserProfile} from "../controller/profile.js";
import express from "express";
import authUser from '../middleware/authUser.js';

const profileRouter = express.Router();

profileRouter.put("/update",authUser,updateUserProfile);
profileRouter.get("/get",authUser,getUserProfile);

export default profileRouter;