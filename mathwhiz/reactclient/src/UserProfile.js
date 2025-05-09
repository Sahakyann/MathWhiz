import React, { useEffect, useState } from "react";
import "./Styles-CSS/UserProfileStyle.css";
import { useParams } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import API_BASE_URL from './constants';
import { FaRegStar, FaStar } from "react-icons/fa";

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
  const [favoriteAssetIds, setFavoriteAssetIds] = useState([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const toggleFavorite = async (assetId) => {
    const isAlreadyFavorite = favoriteAssetIds.includes(assetId);

    try {
      const method = isAlreadyFavorite ? "DELETE" : "POST";
      const response = await fetch(`${API_BASE_URL}/api/user-favorites/${userId}/${assetId}`, {
        method,
        credentials: "include"
      });

      if (response.ok) {
        // Sort to show user favorites on the top
        setFavoriteAssetIds((prev) =>
          isAlreadyFavorite
            ? prev.filter((id) => id !== assetId)
            : [...new Set([...prev, assetId])]

        );
        //fetchUserAssets();
      } else {
        console.error("Failed to toggle favorite");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user-favorites/${userId}`);
      if (response.ok) {
        const favorites = await response.json();
        console.log(favorites)
        setFavoriteAssetIds(favorites);
        return favorites;
      }
    } catch (err) {
      console.error("Error loading favorites", err);
    }
  };

  const handleDeleteAsset = async (assetId) => {
    if (!window.confirm("Are you sure you want to delete this visualization?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/delete-user-asset/${userId}/${assetId}`, {
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
        const response = await fetch(`${API_BASE_URL}/api/validate-token`, {
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
        const response = await fetch(`${API_BASE_URL}/api/get-user-by-id/${userId}`, {
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
        const response = await fetch(`${API_BASE_URL}/api/get-profile-picture/${userId}`, {
          method: "GET"
        });

        const result = await response.json();
        console.log(result.success)
        console.log(result.filePath)
        if (result.success) {
          setImage(`${API_BASE_URL}${result.filePath}`);
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
        const response = await fetch(`${API_BASE_URL}/api/get-background-picture/${userId}`, {
          method: "GET"
        });

        const result = await response.json();
        console.log(result.success)
        console.log(result.filePath)
        if (result.success) {
          setBackgroundImage(`${API_BASE_URL}${result.filePath}`);
        } else {
          setBackgroundImage("/default-background.jfif");
        }
      } catch (error) {
        console.log("Error fetching the background image:", error);
        setBackgroundImage("/default-background.jfif");
      }
    };

    const fetchUserAssets = async (favorites = []) => {
      setAssetsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/get-user-assets/${userId}`);
        if (response.ok) {
          const assets = await response.json();
          // Sort to show user favorites on the top
          const sorted = [...assets].sort((a, b) => {
            const aFav = favorites.includes(a.assetId);
            const bFav = favorites.includes(b.assetId);
            return (aFav === bFav) ? 0 : aFav ? -1 : 1;
          });

          setUserAssets(sorted);
        } else {
          console.error("Failed to fetch user assets");
        }
      } catch (error) {
        console.error("Error fetching user assets:", error);
      } finally {
        setAssetsLoading(false);
      }
    };


    const initialize = async () => {
      await getUserProfilePicture();
      await getUserBackgroundImage();
      await getUserDetails();
      await validateToken();
      const favorites = await fetchFavorites();
      await fetchUserAssets(favorites);
    };

    initialize();



  }, [userId]);

  const handleSave = async () => {
    const userToUpdate = {
      user_Id: userId,
      display_Name: username,
      bio: bio
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/update-user`, {
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
      const response = await fetch(`${API_BASE_URL}/api/upload-profile-picture/${userId}`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const result = await response.json();
      console.log(result.success)
      console.log(result.filePath)
      if (result.success) {
        setImage(`${API_BASE_URL}${result.filePath}`);
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
      const response = await fetch(`${API_BASE_URL}/api/upload-background-picture/${userId}`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const result = await response.json();
      console.log(result.success)
      console.log(result.filePath)
      if (result.success) {
        setBackgroundImage(`${API_BASE_URL}${result.filePath}`);
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
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          className="transparent-button"
          onClick={() => setShowBookmarksOnly((prev) => !prev)}
        >
          {showBookmarksOnly ? "Show All Visualizations" : "Show Bookmarks Only"}
        </button>
      </div>
      {assetsLoading ? (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading assets...</p>
        </div>
      ) : (
        <div className="asset-grid">
          {userAssets.length > 0 ? (
            (userAssets.filter(asset =>
              !showBookmarksOnly || favoriteAssetIds.includes(asset.assetId)
            )).map((asset, index) => (
              <div className="asset-item" key={index}>
                <div className="user-profile-video-wrapper">
                  {asset.saved_Asset.endsWith(".mp4") ? (
                    <video
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="asset-video"
                      onClick={() => setSelectedVideo(asset)}
                    >
                      <source src={`${API_BASE_URL}${asset.saved_Asset}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={`${API_BASE_URL}${asset.saved_Asset}`}
                      alt="Saved Visualization"
                      className="asset-video"
                      onClick={() => setSelectedVideo(asset)}
                    />
                  )}
                  {authorized && (
                    <button
                      className="favorite-button"
                      onClick={() => toggleFavorite(asset.assetId)}
                      style={{
                        color: favoriteAssetIds.includes(asset.assetId) ? 'gold' : 'white',
                      }}
                      title={favoriteAssetIds.includes(asset.assetId) ? "Remove Bookmark" : "Bookmark"}
                    >
                      {favoriteAssetIds.includes(asset.assetId) ? <FaStar /> : <FaRegStar />}
                    </button>
                  )}
                </div>
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
            <div className="filename-label">
              <span>{selectedVideo.fileName} – Created at {selectedVideo.createdAt}</span>
              {authorized && (
                <button className="delete-button" onClick={() => handleDeleteAsset(selectedVideo.assetId)}>
                  Delete
                </button>
              )}
            </div>
            {selectedVideo.saved_Asset.endsWith(".mp4") ? (
              <video src={`${API_BASE_URL}${selectedVideo.saved_Asset}`} autoPlay loop muted controls />
            ) : (
              <img src={`${API_BASE_URL}${selectedVideo.saved_Asset}`} alt="Saved Visualization" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};



export default UserProfile;