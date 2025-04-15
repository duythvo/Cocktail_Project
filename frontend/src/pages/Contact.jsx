import React, { useState } from "react";
import { asesets } from "../assets/assets";
import Subcribe from "../components/Subcribe";
import OtherRecipes from "../components/OtherRecipes";
import { useNavigate } from "react-router-dom";
import FormContact from "../components/FormContact";

const Contact = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    navigate("/contact"); // Điều hướng đến trang có modal
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate(-1); // Quay lại trang trước đó khi đóng modal
  };

  return (
    <div className="mt-10 px-4 md:px-10">
      {/* Giới thiệu */}
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-semibold">
          Become a part of the Coppa Cocktails Community.
        </p>
        <p className="text-lg md:text-xl text-gray-500 mt-2">
          Are you a consumer, reseller, collaborator, or a cocktail lover with
          questions?
        </p>
        <p className="text-2xl md:text-3xl mt-5 font-semibold">Get in touch!</p>
      </div>

      {/* Liên hệ */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Sections */}
        {[
          {
            title: "Marketing",
            description:
              "Do you have any questions regarding marketing, partnerships, sponsorships, collaborations or press?",
            email: "marketing@cocktailland.com",
          },
          {
            title: "Sales",
            description:
              "Do you have any sales-related inquiries or business partnership questions?",
            email: "sales@cocktailland.com",
          },
          {
            title: "Consumer and Other Questions",
            description:
              "Do you have general inquiries about our products or services?",
            email: "info@cocktailland.com",
          },
          {
            title: "Have Questions About Cocktail",
            description:
              "Do you have general inquiries about our products or services?",
            email: "infoaboutcocktail@cocktailland.com",
          },
        ].map((section, index) => (
          <div
            key={index}
            className="flex flex-col items-center md:items-start text-center md:text-left bg-white p-6 rounded-lg shadow-md"
          >
            <p className="text-xl font-bold">{section.title}</p>
            <p className="text-gray-500 text-lg mt-2">{section.description}</p>
            <p className="font-bold mt-4 text-lg">{section.email}</p>
            <button
              className="mt-5 px-5 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
              onClick={openModal}
            >
              SEND US A MESSAGE
            </button>
          </div>
        ))}
      </div>

      {/* Company Details */}
      <div className="bg-cyan-50 p-6 md:p-10 mt-20 rounded-lg">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-10">
          {/* Thông tin công ty */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold">Company Details</h1>
            <p className="text-gray-500 mt-3">Coppa Cocktails Company</p>
            <p className="text-gray-500 mt-1">Amsterdam - The Netherlands</p>
            <p className="text-gray-500 mt-1">Chamber of Commerce: 77582586</p>
            <p className="text-gray-500 mt-1">
              Telephone number: +34 938 148 000
            </p>
            <div className="flex justify-center lg:justify-start gap-5 mt-5">
              <button
                className="px-4 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
                onClick={() => navigate("/")}
              >
                Home
              </button>
              <button
                className="px-4 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
                onClick={() => navigate("/recipes")}
              >
                Our Cocktail
              </button>
            </div>
          </div>

          {/* Ảnh nền (Ẩn trên mobile, chỉ hiển thị trên desktop) */}
          <div className="hidden lg:block w-2/5">
            <img
              className="object-cover rounded-lg"
              src={asesets.ruou}
              alt="Company Drink"
            />
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <FormContact isOpen={isOpen} onClose={closeModal} />
      <Subcribe />
      <OtherRecipes />
    </div>
  );
};

export default Contact;
