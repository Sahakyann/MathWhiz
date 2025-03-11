import React, { useEffect, useState } from "react";
import "./UserProfileStyle.css";
import { useParams } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";

const UserProfile = () => {
  const [image, setImage] = useState("/Koala.jpg");
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfilePicture = async (event) => {
      try {
        const response = await fetch(`https://localhost:7160/api/get-profile-picture/${userId}`, {
          method: "GET"
        });
    
        const result = await response.json();
        console.log(result.success)
        console.log(result.filePath)
        if (result.success) {
          setImage(`https://localhost:7160${result.filePath}`);
        } else {
          console.log(result.Message || "Failed to get the profile picture.");
          setImage("/Koala.jpg");
        }
      } catch (error) {
        console.log("Error fetching the file:", error);
        setImage("/Koala.jpg");
      }
    }

    getUserProfilePicture();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`https://localhost:7160/api/upload-profile-picture/${userId}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result.success)
      console.log(result.filePath)
      if (result.success) {
        setImage(`https://localhost:7160${result.filePath}`);
      } else {
        alert(result.Message || "Failed to fetch the file.");
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      alert("Error uploading the file.");
    }
  };



  return (
    <div className="user-profile-container">
      <button className="transparent-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
      <div className="profile-header">User Profile</div>
      {/*<p>User ID: {userId}</p>*/}
      <div className="profile-picture-wrapper">
        <label htmlFor="file-input" className="profile-picture-label">
          <img
            src={image || "Koala.jpg"}
            alt="User Profile"
            className="profile-picture"
            style={{ cursor: "pointer" }}
            onLoad={() => console.log("Image loaded successfully")}
            onError={(e) => {
              console.error("Image failed to load:", e.target.src);
            }}
          />
        </label>


        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default UserProfile;