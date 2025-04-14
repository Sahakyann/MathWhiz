import React, { useEffect, useState } from "react";
import "./Styles-CSS/UserProfileStyle.css";
import { useParams } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";

const UserProfile = () => {
  const [image, setImage] = useState("/Koala.jpg");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState("/default-background.jpg");
  const [username, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [userAssets, setUserAssets] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [assetsLoading, setAssetsLoading] = useState(true);

  const handleDeleteAsset = async (assetId) => {
    if (!window.confirm("Are you sure you want to delete this visualization?")) return;

    try {
      const response = await fetch(`https://localhost:7160/api/delete-user-asset/${userId}/${assetId}`, {
        method: "DELETE"
      });

      const result = await response.json();
      if (result.success) {
        setUserAssets(prev => prev.filter(asset => asset.assetId !== assetId));
      } else {
        alert(result.message || "Failed to delete asset.");
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
      alert("An error occurred while deleting the asset.");
    }
  };


  useEffect(() => {

    const validateToken = async () => {
      try {
        const response = await fetch("https://localhost:7160/api/validate-token", {
          method: "GET",
          credentials: "include"
        });

        const result = await response.json();
        if (result.isValid && result.userID === userId) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setAuthorized(false);
      }
    };

    const getUserDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7160/api/get-user-by-id/${userId}`, {
          method: "GET",
          credentials: "include"
        });

        if (response.ok) {
          const data = await response.json();
          setDisplayName(data.display_Name || "");
          setBio(data.bio || "");
        } else {
          console.error("Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

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

    const getUserBackgroundImage = async () => {
      try {
        const response = await fetch(`https://localhost:7160/api/get-background-picture/${userId}`, {
          method: "GET"
        });

        const result = await response.json();
        console.log(result.success)
        console.log(result.filePath)
        if (result.success) {
          setBackgroundImage(`https://localhost:7160${result.filePath}`);
        } else {
          setBackgroundImage("/default-background.jfif");
        }
      } catch (error) {
        console.log("Error fetching the background image:", error);
        setBackgroundImage("/default-background.jfif");
      }
    };

    const fetchUserAssets = async () => {
      setAssetsLoading(true);
      try {
        const response = await fetch(`https://localhost:7160/api/get-user-assets/${userId}`);
        if (response.ok) {
          const assets = await response.json();
          setUserAssets(assets);
        } else {
          console.error("Failed to fetch user assets");
        }
      } catch (error) {
        console.error("Error fetching user assets:", error);
      } finally {
        setAssetsLoading(false);
      }
    };



    getUserProfilePicture();
    getUserBackgroundImage();
    getUserDetails();
    validateToken();
    fetchUserAssets();
  }, [userId]);

  const handleSave = async () => {
    const userToUpdate = {
      user_Id: userId,
      display_Name: username,
      bio: bio
    };

    try {
      const response = await fetch("https://localhost:7160/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(userToUpdate)
      });

      if (response.ok) {
        alert("User information updated successfully!");
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating.");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`https://localhost:7160/api/upload-profile-picture/${userId}`, {
        method: "POST",
        body: formData,
        credentials: "include"
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

  const handleBackgroundUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`https://localhost:7160/api/upload-background-picture/${userId}`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const result = await response.json();
      console.log(result.success)
      console.log(result.filePath)
      if (result.success) {
        setBackgroundImage(`https://localhost:7160${result.filePath}`);
      } else {
        alert(result.Message || "Failed to upload background image.");
      }
    } catch (error) {
      console.error("Error uploading background image:", error);
      alert("Error uploading background image.");
    }
  };

  return (
    <div className="user-profile-container">

      {/*<p>User ID: {userId}</p>*/}
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          width: "100%",
          position: "relative"
        }}
      >

      </div>
      <div className="profile-header-container">
        <div className="profile-picture-wrapper">
          <label htmlFor="file-input" className="profile-picture-label">
            <img
              src={image || "Koala.jpg"}
              alt="User Profile"
              className="profile-picture"
              style={{ cursor: "pointer" }}
              onLoad={() => console.log("Profile Image loaded successfully")}
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
              }}
            />
          </label>
          {authorized && (
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
          )}
        </div>

        <div className="user-info-block">

          <input
            type="text"
            className="user-info-input"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={!authorized}
          />
          <textarea
            className="user-info-textarea"
            placeholder="Enter bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={!authorized}
          />
        </div>
        {authorized && (
          <button className="transparent-button save-button" onClick={handleSave} disabled={!authorized}>
            Save
          </button>
        )}

        <div className="bottom-right-controls">
          <button className="transparent-button" onClick={() => navigate('/')}>
            Back to Home
          </button>
          {authorized && (
            <label htmlFor="background-file-input" className="transparent-button">
              <div className="upload-overlay">Change Background</div>
            </label>
          )}
          {authorized && (
            <input
              id="background-file-input"
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              className="file-input"
              style={{ display: "none" }}

            />
          )}
        </div>
      </div>
      {assetsLoading ? (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading assets...</p>
        </div>
      ) : (
        <div className="asset-grid">
          {userAssets.length > 0 ? (
            userAssets.map((asset, index) => (
              <div className="asset-item" key={index}>
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="asset-video"
                  onClick={() => setSelectedVideo(asset)}
                >
                  <source src={`https://localhost:7160${asset.saved_Asset}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

              </div>
            ))
          ) : (
            <p style={{ color: "white", marginTop: "20px" }}>No visualizations saved yet.</p>
          )}
        </div>
      )}
      {selectedVideo && (
        <div className="video-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="video-popup" onClick={(e) => e.stopPropagation()}>
            <>
              {/*console.log(selectedVideo.fileName)*/}
              <div className="filename-label">
                <span>{selectedVideo.fileName} – Created at {selectedVideo.createdAt}</span>
                {authorized && (
                  <button className="delete-button" onClick={() => handleDeleteAsset(selectedVideo.assetId)}>
                    Delete Video
                  </button>
                )}
              </div>
              <video src={`https://localhost:7160${selectedVideo.saved_Asset}`} autoPlay loop muted controls />

            </>
          </div>
        </div>
      )}
    </div>
  );
};



export default UserProfile;