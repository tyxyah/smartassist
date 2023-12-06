import React, { useState } from "react";
import profile from "../assets/default-profile.png";
import { useAuthContext } from "../hooks/useAuthContext";

function ProfilePicture() {
  const [image, setImage] = useState(null);
  const {user} = useAuthContext()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDefaultImageClick = () => {
    document.getElementById("profile-image-upload").click();
  };

  return (
    <div>
      <div className="profile-container" onClick={handleDefaultImageClick}>
        {image ? (
          <img src={image} alt="User's profile" className="circular-image" />
        ) : (
          <img src={profile} alt="Default Profile" className="circular-image" />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="profile-image-upload"
        style={{ display: "none" }}
      />
      {user&&<div className="user-details">
        <span>{user.username}</span>
      </div>}
    </div>
  );
}

export default ProfilePicture;
