import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create socket connection inside useEffect
        const newSocket = io(`${import.meta.env.VITE_BASE_URL}`, {
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
            transports: ['websocket'] // Force WebSocket transport
        });

        // Basic connection logic
        newSocket.on('connect', () => {
            console.log('Connected to server with ID:', newSocket.id);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        setSocket(newSocket);

        // Cleanup function
        return () => {
            if (newSocket) {
                console.log('Cleaning up socket connection');
                newSocket.disconnect();
            }
        };
    }, []); // Empty dependency array - only run once on mount

    if (!socket) {
        return null; // or a loading spinner
    }

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;