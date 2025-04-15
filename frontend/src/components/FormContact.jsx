import React, { useState } from "react";

function FormContact({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);

  const handleOnClick = (e) => {
    if (name == null || email == null || message == null) {
      alert("Nhập đầy đủ thông tin");
    } else {
        onClose()
      alert(`${name} đã gửi yêu cầu thành công`);
      setName("");
      setMessage("");
      setEmail("");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/50">
      <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            SEND US A MESSAGE
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            ✖
          </button>
        </div>
        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 border rounded"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={handleOnClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-tl-2xl rounded-br-2xl text-sm px-10  py-2.5"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormContact;
