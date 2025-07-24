import express from 'express';
import { requestConnection, respondToConnection, getConnections, deleteConnection } from '../controller/connection.js';
import authUser from "../middleware/authUser.js";

const connectionRouter = express.Router();

connectionRouter.post('/request', requestConnection);
connectionRouter.post('/respond', respondToConnection);
connectionRouter.get('/get',authUser,getConnections);
connectionRouter.delete('/:connectionId', deleteConnection); 

export default connectionRouter;
