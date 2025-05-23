﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace aspnetserver.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public string ProfilePicture { get; set; }

    public string UserBio { get; set; }

    public string DisplayName { get; set; }

    public string ProfileBackground { get; set; }

    public string Email { get; set; }

    public string ConfirmationCode { get; set; }

    public bool IsVerified { get; set; }

    public virtual ICollection<SavedAsset> SavedAssets { get; set; } = new List<SavedAsset>();

    public virtual ICollection<UserFavorite> UserFavorites { get; set; } = new List<UserFavorite>();
}