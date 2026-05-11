import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function Chat() {

  const [messages,
  setMessages] =
  useState([]);

  const [message,
  setMessage] =
  useState("");

  const [receiverEmail,
  setReceiverEmail] =
  useState("");

  const senderEmail =
  localStorage.getItem(
    "email"
  );


  // ==========================
  // Fetch Messages
  // ==========================
  const fetchMessages =
  async () => {

    if (!receiverEmail) return;

    try {

      const res =
      await axios.get(
        `http://localhost:5000/api/chat/${senderEmail}/${receiverEmail}`
      );

      setMessages(
        res.data
      );

    } catch (err) {

      console.log(err);
    }
  };


  useEffect(() => {

    fetchMessages();

  }, [receiverEmail]);


  // ==========================
  // Send Message
  // ==========================
  const sendMessage =
  async () => {

    if (!message) return;

    try {

      await axios.post(
        "http://localhost:5000/api/chat/send",
        {
          senderEmail,
          receiverEmail,
          message,
        }
      );

      setMessage("");

      fetchMessages();

    } catch (err) {

      console.log(err);
    }
  };


  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">

      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">

        <h1 className="text-4xl font-bold mb-6 text-center">

          Chat System

        </h1>


        {/* Receiver Email */}
        <input
          type="email"
          placeholder="Enter Receiver Email"
          value={receiverEmail}
          onChange={(e) =>
            setReceiverEmail(
              e.target.value
            )
          }

          className="w-full border p-3 rounded mb-4"
        />


        {/* Chat Messages */}
        <div className="h-[400px] overflow-y-auto border rounded p-4 bg-gray-50">

          {messages.map((msg) => (

            <div
              key={msg._id}
              className={`mb-4 flex ${
                msg.senderEmail === senderEmail
                ? "justify-end"
                : "justify-start"
              }`}
            >

              <div
                className={`px-4 py-2 rounded-xl max-w-[70%] ${
                  msg.senderEmail === senderEmail
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
                }`}
              >

                <p>
                  {msg.message}
                </p>

                <p className="text-xs mt-1 opacity-70">

                  {
                    new Date(
                      msg.createdAt
                    ).toLocaleTimeString()
                  }

                </p>

              </div>

            </div>

          ))}

        </div>


        {/* Message Input */}
        <div className="flex mt-4">

          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }

            className="flex-1 border p-3 rounded-l"
          />


          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 rounded-r"
          >

            Send

          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;