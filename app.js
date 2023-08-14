import express from 'express'
import cors from 'cors'
import http from 'http'
import {getTags, sendMessage, getMessages} from "./controllers/userController.js";
import { initSocketServer } from './socket.js';

const app = express();
const server = http.createServer(app);
initSocketServer(server);

app.use(express.json())
app.use(cors({
    origin: 'https://itransition-task6-front.vercel.app',
}));
const port = process.env.PORT || 3301

server.listen(port, () => {
    console.log(`Running on port ${port}`)
})

app.post('/api/send', sendMessage)

app.get('/api/tags', getTags)

app.get('/', getMessages)
