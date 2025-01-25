const {Server} = require("socket.io");
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
            console.log(data);

            const{userId,userType} = data;
            console.log(`User ${userId} joined with userType ${userType}`);


            if(userType === 'user'){
                 await userModel.findByIdAndUpdate(userId,{
                    socketId: socket.id,
                });
            }else if(userType === 'captain'){
                await capatainModel.findByIdAndUpdate(userId,{
                    socketId: socket.id,
                });
            }

            socket.on('update-location-captain',async(data)=>{
                const{userId,location} = data;
                if(!location || !location.latitude || !location.longitude){
                    return socket.emit('error','Invalid location');

                }
                console.log(`User ${userId} updated location ${location}`);


                    await capatainModel.findByIdAndUpdate(userId,{
                        location: {
                            latitude:location.latitude,
                            longitude:location.longitude
                          }
                    });



            })
            socket.on('update-captain-details',async(data)=>{
                const {userId,TodayEarnings,HoursWorked,DistanceTravelled,RideDone} = data;
                if(!TodayEarnings || !HoursWorked || !DistanceTravelled || !RideDone){
                    return socket.emit('error','Invalid details')
                }
                console.log(`User ${userId} updated details ${userId}`);

                    await capatainModel.findByIdAndUpdate(userId,{
                     $inc:{   TotalEarnings:TodayEarnings,
                        hoursWorked:HoursWorked,
                        distanceTravelled:DistanceTravelled,
                        RideDone:RideDone
                     }
                    });
                    console.log('Captain details updated successfully');
                    socket.emit('update-success', 'Details updated');


            })


        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
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