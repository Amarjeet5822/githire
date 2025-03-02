import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

const Chat = ({ userId, receiverId }) => {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch Messages
    axios
      .get(`http://localhost:5000/api/messages/${userId}/${receiverId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));

    // Listen for New Messages
    socket.on("receiveNotification", ({ message }) => {
      setMessages((prev) => [...prev, { senderId: receiverId, message }]);
    });

    return () => socket.off("receiveNotification");
  }, [userId, receiverId]);

  // Send Message
  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage = { senderId: userId, receiverId, message };
    axios.post("http://localhost:5000/api/messages", newMessage);
    setMessages([...messages, newMessage]);
    socket.emit("sendNotification", { receiverId, message });
    setMessage("");
  };

  return (
    <div className="bg-white shadow-md rounded p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2">💬 Chat</h2>
      <div className="h-60 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, index) => (
          <p key={index} className={msg.senderId === userId ? "text-right text-green-600" : "text-left text-blue-600"}>
            {msg.message}
          </p>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="border rounded px-2 py-1 flex-grow"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
