import { Server } from 'socket.io';

const io = new Server(null, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cors: {
        origin: 'https://itransition-task6-front.vercel.app',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
});

export const initSocketServer = (server) => {
    io.attach(server)

    io.on('connection', (socket) => {
        console.log('client connected: ', socket.id);
    });
};

export { io }
