import React, { useState } from "react";
import { asesets } from "../assets/assets";
import { toast } from "react-toastify";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  // Hàm kiểm tra email hợp lệ
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("❌ Email is required.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("❌ Please enter a valid email.");
      return;
    }

    toast.success("✔️ Subscribed successfully.");
    setEmail(""); // Xóa nội dung input sau khi gửi
  };

  return (
    <div className="bg-cyan-50 rounded-3xl mt-15 pt-13 pb-13 relative h-9/12 sm:h-96 w-full">
      <h1 className="text-3xl font-bold text-center">
        Deliciousness to your inbox
      </h1>
      <div className="flex justify-center mt-6">
        <p className="w-2/4 text-center">
          Get the latest cocktail recipes and exclusive drink ideas straight to your email.
        </p>
      </div>
      <div className="flex justify-center mt-8 relative w-full">
        <div className="relative w-full max-w-lg">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full p-3 pr-24 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            onClick={handleSubscribe}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white font-semibold px-5 py-2 rounded-full cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>

      <div className="max-w-25 hidden xl:block md:max-w-40 lg:max-w-52 absolute lg:top-34 lg:left-1 md:top-44 sm:top-50 top-80">
        <img className="object-cover" src={asesets.whisky} alt="Whisky" />
      </div>
      <div className="max-w-35 hidden xl:block sm:max-w-50 md:max-w-50 lg:max-w-70 absolute lg:top-33 md:top-44 right-0 sm:top-50 top-80">
        <img className="object-cover" src={asesets.lemon} alt="Lemon" />
      </div>
    </div>
  );
};

export default Subscribe;
