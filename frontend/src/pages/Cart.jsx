import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { usePayOS } from "@payos/payos-checkout";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    recipes,
    cart,
    removeFromCart,
    setCart,
    removeAllFromCart,
    addToRecipeBoxFromCart,
    createOrder,
    backendUrl,
  } = useContext(AppContext);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const selectedItemsRef = useRef([]);
  useEffect(() => {
    selectedItemsRef.current = selectedItems;
  }, [selectedItems]);

  const totalPrice = selectedItems.reduce(
    (acc, id) => acc + (cart.find((item) => item.recipeId === id)?.price || 0),
    0
  );

  const [payOSConfig, setPayOSConfig] = useState({
    RETURN_URL: window.location.href,
    ELEMENT_ID: "embedded-payment-container",
    CHECKOUT_URL: null,
    embedded: true,
    onSuccess: async () => {
      setIsOpen(false);
      setMessage("Thanh toán thành công!");
      toast.success("Thanh toán thành công!");

      const listItems = selectedItemsRef.current.map((id) => {
        const item = cart.find((i) => i.recipeId === id);
        return {
          recipeId: item.recipeId,
          name: item.name,
          image: item.image,
          price: item.price,
        };
      });

      const total = listItems.reduce((sum, item) => sum + item.price, 0);

      await createOrder(listItems, total);

      selectedItemsRef.current.forEach((id) => {
        removeAllFromCart(id);
        addToRecipeBoxFromCart(id);
      });

      setSelectedItems([]);
    },
  });

  const { open, exit } = usePayOS(payOSConfig);

  const handleCheckboxChange = (recipeId) => {
    console.log(recipeId);
    setSelectedItems((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleGetPaymentLink = async () => {
    if (selectedItems.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }

    setIsCreatingLink(true);
    if (isOpen) exit();

    try {
      const response = await fetch(`${backendUrl}/api/payment`, {
        method: "POST",
        body: JSON.stringify({ items: selectedItems }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Lỗi kết nối đến server.");
        return;
      }

      const result = await response.json();
      setPayOSConfig((old) => ({
        ...old,
        CHECKOUT_URL: result.checkoutUrl,
      }));

      setIsOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setIsCreatingLink(false);
    }
  };

  useEffect(() => {
    if (payOSConfig.CHECKOUT_URL != null) {
      open();
    }
  }, [payOSConfig]);

  if (message) {
    return (
      <div className="main-box transition-all duration-500">
        <div className="checkout text-center font-semibold p-5">
          <p className="text-green-600 text-xl">{message}</p>
          <form action="/">
            <button
              type="submit"
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Quay lại trang thanh toán
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-lg rounded-xl p-4 bg-white">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-3">Choose</th>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr
              key={item.recipeId}
              className="hover:bg-gray-50 transition-all duration-300 border-b"
            >
              <td className="px-5 py-3">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.recipeId)}
                  onChange={() => handleCheckboxChange(item.recipeId)}
                />
              </td>
              <td className="px-4 py-3">
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded shadow"
                  alt={item.name}
                />
              </td>
              <td className="px-4 py-3 font-semibold">{item.name}</td>
              <td className="px-4 py-3 font-semibold">{item.price} VND</td>
              <td className="px-4 py-3">
                <button
                  className="text-red-500 hover:underline font-bold"
                  onClick={() => removeFromCart(item.recipeId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItems.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 border rounded-lg transition-all duration-300">
          <p className="text-xl font-semibold text-center">
            Total Price:{" "}
            <span className="text-red-600">
              {totalPrice.toLocaleString()} VND
            </span>
          </p>
        </div>
      )}

      <div className="flex justify-center mt-6">
        {!isOpen ? (
          isCreatingLink ? (
            <div className="font-semibold p-2">Creating link...</div>
          ) : (
            <button
              onClick={handleGetPaymentLink}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition text-xl"
            >
              Payment
            </button>
          )
        ) : (
          <button
            onClick={() => {
              setIsOpen(false);
              exit();
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Close link
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <p className="text-center text-sm text-gray-500 mt-2">
            After successful payment, the system will automatically update
            within 5-10 seconds.
          </p>
          <div
            id="embedded-payment-container"
            className="w-full h-[350px] mt-3 rounded-md"
          ></div>
        </>
      )}
    </div>
  );
};

export default Cart;
