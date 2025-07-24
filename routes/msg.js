import express from 'express';
import {sendMessage , getMessages} from '../controller/msg.js';

const msgRouter = express.Router();

msgRouter.post("/",sendMessage);
msgRouter.get("/:connectionId",getMessages);


export default msgRouter;