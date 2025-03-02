import React, { useState, useEffect } from "react";
import api from "../services/api";
import socket from "../socket";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ receiver_id: "", content: "" });
  const [onlineUsers, setOnlineUsers] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchMessages();
    socket.on("onlineUsers", setOnlineUsers);
    return () => socket.off("onlineUsers");
  }, []);

  const fetchMessages = async () => {
    const { data } = await api.get(`/messages/${userId}`);
    setMessages(data);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    await api.post("/messages", { sender_id: userId, ...form });
    fetchMessages();
  };

  return (
    <div className="container mx-auto p-4 flex space-x-4">
      <div className="w-2/3">
        <h2 className="text-3xl font-bold mb-6">Messages</h2>
        <form
          onSubmit={handleSend}
          className="bg-white p-4 rounded-lg shadow-md mb-6 flex space-x-2"
        >
          <input
            value={form.receiver_id}
            onChange={(e) => setForm({ ...form, receiver_id: e.target.value })}
            placeholder="Receiver ID"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Type a message"
            className="flex-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`p-4 rounded-lg shadow-md ${
                msg.sender_id === userId
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              <p className="font-semibold">
                {msg.sender_id === userId ? "You" : `User ${msg.sender_id}`} to{" "}
                {msg.receiver_id === userId ? "You" : `User ${msg.receiver_id}`}
              </p>
              <p>{msg.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/3">
        <h3 className="text-xl font-bold mb-4">Online Users</h3>
        <ul className="space-y-2">
          {Object.entries(onlineUsers).map(([id, status]) => (
            <li key={id} className="flex items-center space-x-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  status ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span>{`User ${id}: ${status ? "Online" : "Offline"}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Messages;
