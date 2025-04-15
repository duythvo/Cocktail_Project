import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import UploadIcon from "@mui/icons-material/Upload";

const MyProfile = () => {
  const { user, setUser, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("phone", user.phone);
      formData.append("gender", user.gender);
      formData.append("dob", user.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    user && (
      <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md sm:max-w-xl flex flex-col gap-6 text-lg m-5">
          <div className="flex flex-col items-center">
            {isEdit ? (
              <label htmlFor="image" className="cursor-pointer relative">
                <img
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-300"
                  src={image ? URL.createObjectURL(image) : user.image}
                  alt="User Avatar"
                />
                <UploadIcon
                  fontSize="large"
                  className="absolute bottom-2 right-2 text-gray-600 bg-white rounded-full p-1 shadow-md"
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-300"
                src={user.image}
                alt="User Avatar"
              />
            )}
          </div>

          <div className="text-center">
            {isEdit ? (
              <input
                className="text-xl sm:text-2xl font-semibold text-center bg-gray-200 w-full p-3 rounded-lg"
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl sm:text-2xl font-semibold text-gray-800">{user.name}</p>
            )}
          </div>

          <hr className="border-gray-300" />

          <div>
            <p className="text-lg sm:text-xl font-bold text-gray-700">Contact Information</p>
            <div className="flex flex-col gap-3 mt-2 text-gray-600">
              <p>
                <span className="font-medium">Email:</span>
                <span className="text-blue-500 ml-2">{user.email}</span>
              </p>
              <p className="font-medium">Phone:</p>
              {isEdit ? (
                <input
                  className="bg-gray-200 p-3 rounded-lg w-full"
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-gray-800">{user.phone}</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-lg sm:text-xl font-bold text-gray-700">Basic Information</p>
            <div className="flex flex-col gap-3 mt-2 text-gray-600">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  className="bg-gray-200 p-3 rounded-lg w-full"
                  name="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-800">{user.gender}</p>
              )}

              <p className="font-medium">Birthday:</p>
              {isEdit ? (
                <input
                  className="bg-gray-200 p-3 rounded-lg w-full"
                  type="date"
                  name="dob"
                  value={user.dob}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-gray-800">{user.dob}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            {isEdit ? (
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                onClick={updateUserProfileData}
              >
                Save Information
              </button>
            ) : (
              <button
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                onClick={() => setIsEdit(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;