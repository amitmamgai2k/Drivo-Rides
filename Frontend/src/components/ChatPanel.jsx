import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { ArrowLeft, SendHorizontal, Video, VideoIcon, X } from "lucide-react";
import VideoPanel from "./videoPanel";
import messageNoti from '../assets/messageNoti.mp3';

const ChatPanel = ({ isOpen, onClose, Name, Image, rideId, recipientId,setIsChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [videoCall, setVideoCall] = useState(false);
  const [roomID, setRoomID] = useState(null);
  const { socket } = useContext(SocketContext);
  const MessageNotification = useRef(new Audio(messageNoti));

  function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  const startVideoCall = ()=>{
    const newRoomID = randomID(5);
    setRoomID(newRoomID);
    setVideoCall(true);

    //Notify the recipient about incoming call
    socket.emit('start_video_call',{
      roomId:newRoomID,
      recipientId
    })
  };
  useEffect(() => {
    if(!socket) return;
    socket.on("incoming_video_call",({roomID})=>{
      setRoomID(roomID);
      setVideoCall(true);
    });
    return () => {
      socket.off("incoming_video_call");
    }
  },[socket]);

  // Message handler with useCallback to prevent recreating on every render
  const handleMessage = useCallback((message) => {
    setMessages(prev => {
      // Check if message already exists using timestamp and content
      const messageExists = prev.some(
        m => m.timestamp === message.timestamp && m.content === message.content
      );

      if (messageExists) {
        return prev;
      }
      setIsChatOpen(true);
      MessageNotification.current.play();

      return [...prev, message];
    });
  }, []);

  // Set up socket listener
  useEffect(() => {
    if (!socket) return;

    // Remove any existing listeners first
    socket.off('receive_message');

    // Add new listener
    socket.on('receive_message', handleMessage);


    console.log("Socket listener set up");

    // Cleanup on unmount or when dependencies change
    return () => {
      socket.off('receive_message', handleMessage);

      console.log("Socket listener cleaned up");
    };
  }, [socket, handleMessage]);

  const sendMessage = useCallback(() => {
    if (!socket || !newMessage.trim() || !rideId || !recipientId) return;

    const timestamp = new Date().toISOString();
    const messageData = {
      rideId,
      recipientId,
      content: newMessage.trim(),
      timestamp
    };

    // Add message to local state first
    const localMessage = {
      ...messageData,
      isSender: true
    };

    setMessages(prev => [...prev, localMessage]);
    setNewMessage('');

    // Then emit to socket
    socket.emit('send_message', messageData);
  }, [socket, newMessage, rideId, recipientId]);

  // Auto-scroll to bottom when new messages arrive
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={Image}
                  alt={Name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{Name}</h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={startVideoCall}>
              <VideoIcon className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={`${message.timestamp}-${index}`}
            className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md ${
                message.isSender
                  ? 'bg-yellow-200 text-black rounded-t-2xl rounded-l-2xl ml-12'
                  : 'bg-white text-blue-800 rounded-t-2xl rounded-r-2xl mr-12'
              } p-3 shadow-sm`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.isSender ? 'text-black' : 'text-gray-400'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-gray-100 border-0 rounded-full px-6 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
      {videoCall && <VideoPanel roomID={roomID} isOpen={videoCall} setVideoCall={setVideoCall} />}
    </div>
  );
};

export default ChatPanel;