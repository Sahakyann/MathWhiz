import React, { useState } from "react";
import "./UserProfileStyle.css";

const UserProfile = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">User Profile</div>
      <div className="profile-picture-wrapper">
        <label htmlFor="file-input" className="profile-picture-label">
          <img
            src={image || "default-profile.png"}
            alt="User Profile"
            className="profile-picture"
          />
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
      </div>
    </div>
  );
};

export default UserProfile;