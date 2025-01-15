const {Server} = require("socket.io");
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');



let io;


const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            console.log(data);

            const{userId,userType} = data;
            console.log(`User ${userId} joined with userType ${userType}`);


            if(userType === 'user'){
                 await userModel.findByIdAndUpdate(userId,{
                    socketId: socket.id,
                });
            }else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId,{
                    socketId: socket.id,
                });
            }


        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

});
};


const sendMessageToSocketId = (socketId, message) => {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.error('Socket.io is not initialized');
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};