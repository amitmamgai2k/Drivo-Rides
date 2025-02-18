const { Server } = require("socket.io");
const userModel = require('./models/user.model');
const capatainModel = require('./models/captain.model');
const messageModel = require('./models/message.model');




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

            const { userId, userType } = data;
            console.log(`User ${userId} joined with userType ${userType}`);


            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id,
                });
            } else if (userType === 'captain') {
                await capatainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id,
                });
            }

            socket.on('update-location-captain', async (data) => {
                const { userId, location } = data;
                if (!location || !location.latitude || !location.longitude) {
                    return socket.emit('error', 'Invalid location');

                }



                await capatainModel.findByIdAndUpdate(userId, {
                    location: {
                        latitude: location.latitude,
                        longitude: location.longitude
                    }
                });




            })
            socket.on('update-captain-details', async (data) => {
                const { userId, clientId, TodayEarnings, HoursWorked, DistanceTravelled, RideDone } = data;
                if (!TodayEarnings || !HoursWorked || !DistanceTravelled || !RideDone) {
                    return socket.emit('error', 'Invalid details')
                }
                console.log(`User ${userId} updated details ${userId}`);

                await capatainModel.findByIdAndUpdate(userId, {
                    $inc: {
                        TotalEarnings: TodayEarnings,
                        hoursWorked: HoursWorked,
                        distanceTravelled: DistanceTravelled,
                        RideDone: RideDone
                    }
                });
                await userModel.findByIdAndUpdate(clientId, {
                    $inc: {
                        hoursRide: HoursWorked,
                        distanceTravelled: DistanceTravelled,
                        RideDone: RideDone,
                        TotalExepense: TodayEarnings

                    }
                })
                console.log('Captain details updated successfully');
                socket.emit('update-success', 'Details updated');


            });
            socket.on('send_message', async (messageData) => {
                console.log('Received message:', messageData);
                try {
                    const { rideId, recipientId, content, timestamp } = messageData;

                    // Save message to database
                    const newMessage = await messageModel.create({
                        rideId,
                        senderId: userId,
                        recipientId,
                        content,
                        timestamp: timestamp
                    });

                    // Find recipient's socket ID
                    let recipientSocketId;
                    const userRecipient = await userModel.findById(recipientId);
                    const captainRecipient = await capatainModel.findById(recipientId);

                    recipientSocketId = userRecipient?.socketId || captainRecipient?.socketId;
                    console.log('New Message:', newMessage);

                    if (recipientSocketId) {
                        console.log(`Sending to socket: ${recipientSocketId}`);
                        io.to(recipientSocketId).emit('receive_message', {
                            ...messageData,
                            senderId: userId,
                            isSender: false
                        });
                    } else {
                        console.log('Recipient socket ID not found');
                    }

                } catch (error) {
                    console.error('Error handling message:', error);
                    socket.emit('error', 'Failed to send message');
                }
            });
            socket.on('clear-chat-message', async (data) => {
                const { rideId } = data;
                await messageModel.deleteMany({ rideId });
                console.log('Chat cleared successfully');
            });
            socket.on("start_video_call", ({ roomID, recipientId }) => {
                console.log(`User ${userId} started video call with roomID ${roomID} and recipientId ${recipientId}`);
                io.to(recipientId).emit("incoming_video_call", { roomID });
            })
        });


        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);
            try {
                await userModel.updateMany(
                    { socketId: socket.id },
                    { $unset: { socketId: 1 } }
                );
                await capatainModel.updateMany(
                    { socketId: socket.id },
                    { $unset: { socketId: 1 } }
                );
            } catch (error) {
                console.error('Error cleaning up socket ID:', error);
            }
        });
    });

};


const sendMessageToSocketId = (socketId, message) => {
    console.log(`Sending message to socketId: ${socketId} ,message: ${message}`);

    if (io) {
        io.to(socketId).emit(message.event, message.data);
    } else {
        console.error('Socket.io is not initialized');
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};