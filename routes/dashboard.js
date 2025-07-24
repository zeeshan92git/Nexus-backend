import express from "express";
import seedUsers from "../controller/dashboard.js";

const seedRouter = express.Router();
seedRouter.get("/add",seedUsers);

export default seedRouter;