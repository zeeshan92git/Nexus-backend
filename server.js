import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from "http";
import dotenv from 'dotenv';
dotenv.config();
import connectdB from './config/connectdb.js';


const app = express();
//connecting cloud atlas mongo-database
connectdB();

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';
app.use(express.json());

app.use(cors(process.env.FRONTEND_URI));



//setup socket.io
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (userId) => {
        socket.join(userId); // Join room named by user ID
        console.log(`${userId} joined their room`);
    });


    socket.on("send-message", (msg) => {
        io.to(msg.receiver).emit("receive-message", msg);
    });


    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Export `io` if needed in routes
export { io };

//import routers
import userRouter from './routes/user.js';
import profileRouter from './routes/profile.js';
import seedRouter from './routes/dashboard.js';
import msgRouter from './routes/msg.js';
import connectionRouter from './routes/connection.js';


app.get("/", (req, res) => {
    res.send('API working greately.');
});

//API Routes setup  
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use("/api/dashboard", seedRouter);
app.use("/api/msg", msgRouter);
app.use("/api/connection", connectionRouter);

server.listen(port, () => {
    console.log(`Server running on ${host}:${port}`)
});