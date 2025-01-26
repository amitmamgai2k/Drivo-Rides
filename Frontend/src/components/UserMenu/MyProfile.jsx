import React, { useState } from "react";
import { ArrowLeft, UserCheck, Phone, Mail, Calendar, Camera, Edit2, LogOut, ChevronRight, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";

const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);



  if (!props.showProfile) return null;
  console.log("UserData", props.userData);

  const updateProfilePicture = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return;

    try {
      // Show loading indicator
      setIsLoading(true);

      // Create FormData to send the file
      const formData = new FormData();
      formData.append("ProfileImage", file);

      // Make API call to upload the file
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/update-profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Profile picture updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    } finally {
      // Hide loading indicator
      setIsLoading(false);
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const handleCapturePhoto = async (getScreenshot) => {
    const imageSrc = getScreenshot();
    setCapturedImage(imageSrc);

    // Convert Base64 image to Blob
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const formData = new FormData();
    formData.append("ProfileImage", blob, "captured-image.jpg");

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/update-profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Profile picture updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    } finally {
      setIsLoading(false);
    }

    setShowWebcam(false);
  };


  return (
    <div className="fixed inset-0 bg-white z-30 overflow-auto animate-in slide-in-from-right">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => props.toggleProfile(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">My Profile</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center">
          {/* Profile Image Section */}
          <div className="relative group">
            <img
              src={ props.userData?.user?.ProfilePicture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow-lg"
            />

            {/* Camera Button with Options Menu */}
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white shadow-lg hover:bg-blue-600 transition-colors z-10"
              >
                <Camera size={18} />
              </button>

              {showOptions && (
                <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                  <div className="p-2 space-y-2">
                    <button
                      onClick={() => {
                        setShowWebcam(true);
                        setShowOptions(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Camera size={16} className="text-blue-600" />
                      Take Photo
                    </button>
                    <button
                      onClick={() => document.getElementById("profile-picture-input").click()}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Upload size={16} className="text-green-600" />
                      Upload Photo
                    </button>
                  </div>
                  <div className="border-t border-gray-100 p-2">
                    <button
                      onClick={() => setShowOptions(false)}
                      className="w-full text-xs text-gray-500 hover:text-gray-700 text-center"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              id="profile-picture-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={updateProfilePicture}
            />
          </div>

          {/* Webcam for Taking Photos */}
          {showWebcam && (
            <div className="w-full mt-4 flex flex-col items-center">
              <Webcam
                audio={false}
                height={720}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
                className="rounded-lg shadow-lg"
              >
                {({ getScreenshot }) => (
                  <button
                    onClick={() => handleCapturePhoto(getScreenshot)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                  >
                    Capture Photo
                  </button>
                )}
              </Webcam>
            </div>
          )}

          {/* User Info */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-bold text-center text-gray-900">
                {props.userData?.user?.fullname?.firstname}{" "}
                {props.userData?.user?.fullname?.lastname}
              </h2>

            </div>
            <p className="text-gray-500 mt-1">Personal Account</p>
          </div>

          {/* Info Cards */}
          <div className="w-full mt-8 space-y-1">
            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{props.userData?.user?.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{props.userData?.user?.mobileNumber}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserCheck className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Account</p>
                  <p className="text-gray-900">Verified as User</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="text-orange-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900">{props.userData?.user?.createdAt.slice(0, 4)}</p>
                </div>
              </div>
            </div>

            <div className="mt-2 border-t">
              <Link
                to="/delete-account"
                state={{ userData: props.userData }}
                className="w-full flex items-center justify-between px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-pink-200 rounded-lg p-2">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span>Delete Account</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
