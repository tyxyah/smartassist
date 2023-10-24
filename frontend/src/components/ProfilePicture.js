import React, { useState } from "react";
import profile from "../assets/default-profile.png";

function ProfilePicture() {

  const circularImageStyles = {
    width: "88px",
    height: "88px",
    objectFit: "cover",
    borderRadius: "50%",
  };

  const [image, setImage] = useState(null);

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
      <div
        className="profile-container"
        onClick={handleDefaultImageClick}
        style={{ cursor: "pointer" }}
      >
        {image ? (
          <img src={image} alt="User's profile" style={circularImageStyles} />
        ) : (
          <img
            src={profile}
            alt="Default Profile"
            style={circularImageStyles}
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="profile-image-upload"
        style={{ display: "none" }}
      />
      <div>
        <p style={{textAlign: "center"}}>Add details here</p>
      </div>
    </div>
  );
}

export default ProfilePicture;
