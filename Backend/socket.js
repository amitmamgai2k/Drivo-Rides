const { Server } = require("socket.io");
const userModel = require('./models/user.model');
const capatainModel = require('./models/captain.model');

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
            console.log("Join event received:", data);

            const { userId, userType } = data;
            console.log(`User ${userId} joined with userType ${userType}`);

            try {
                if (userType === 'user') {
                    const user = await userModel.findByIdAndUpdate(userId, {
                        socketId: socket.id,
                    }, { new: true });
                    console.log("Updated user:", user);
                } else if (userType === 'captain') {
                    const captain = await capatainModel.findByIdAndUpdate(userId, {
                        socketId: socket.id,
                    }, { new: true });
                    console.log("Updated captain:", captain);
                }
            } catch (error) {
                console.error("Error updating socketId:", error);
            }
        });

        socket.on('update-location-captain', async (data) => {
            console.log("Location update received:", data);

            const { userId, location } = data;
            if (!location || !location.latitude || !location.longitude) {
                console.error("Invalid location data:", location);
                return socket.emit('error', 'Invalid location data');
            }

            try {
                const updatedCaptain = await capatainModel.findByIdAndUpdate(userId, {
                    location: {
                        longitude: location.longitude,
                        latitude: location.latitude
                    }
                }, { new: true });

                console.log("Captain location updated:", {
                    captainId: userId,
                    newLocation: updatedCaptain.location,
                    socketId: updatedCaptain.socketId
                });

                // Verify location is stored correctly
                const verifiedCaptain = await capatainModel.findById(userId);
                console.log("Verified captain location:", verifiedCaptain.location);

            } catch (error) {
                console.error("Error updating captain location:", error);
                socket.emit('error', 'Failed to update location');
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

const sendMessageToSocketId = (socketId, message) => {
    console.log("Attempting to send message:", {
        socketId,
        event: message.event,
        data: message.data
    });

    if (!io) {
        console.error('Socket.io not initialized');
        return;
    }

    try {
        io.to(socketId).emit(message.event, message.data);
        console.log(`Message sent successfully to socket ${socketId}`);
    } catch (error) {
        console.error(`Error sending message to socket ${socketId}:`, error);
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
