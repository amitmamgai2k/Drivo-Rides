import React from "react";
import { ArrowLeft,SendHorizontal , Video } from "lucide-react";

const ChatPanel = ({ isOpen, onClose, Name, Image }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed h-screen top-0 left-0 right-0 bottom-0 bg-gray-100  flex flex-col py-10 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-3">
        <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={onClose} />
        <p className="text-lg font-bold">Chat</p>
        <Video  className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Driver Info */}
      <div className="flex flex-col items-center justify-center flex-1">
        <img
          src={Image}
          alt="Driver"
          className="w-20 h-20 rounded-full object-cover"
        />
        <h2 className="text-lg font-bold mt-2">{Name}</h2>
        <p className="text-sm text-gray-500 text-center px-6 mt-1">
          Note: Reply to your message can be delayed as drivers don’t reply while driving.
        </p>
      </div>

      {/* Chat Input */}
      <div className="p-3  flex items-center">
        <input
          type="text"
          placeholder="Type your message"
          className="w-full p-3 rounded-full border outline-none bg-gray-100"
        />
        <SendHorizontal className="text-blue-500" />
      </div>
    </div>
  );
};

export default ChatPanel;

