import userModel from "../model/user.js";

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findById(userId).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    //console.log('user fetched data\n', user);
    res.status(200).json({ success: true, message: "User profile fetched", data: user });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { name, bio, location, website, startupName, startupDescription, fundingNeed, pitchDeckURL, interests, portfolio } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Common fields
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.location = location || user.location;
    user.website = website || user.website;


    // Role-specific updates
    if (user.role === "entrepreneur") {
      user.startupName = startupName || user.startupName;
      user.startupDescription = startupDescription || user.startupDescription;
      user.fundingNeed = fundingNeed || user.fundingNeed;
      user.pitchDeckURL = pitchDeckURL || user.pitchDeckURL;
    }

    if (user.role === "investor") {
      user.interests = interests || user.interests;
      user.portfolio = portfolio || user.portfolio;
    }

    user.profileCompleted = true; // mark as completed when updating

    const updatedUser = await user.save();
    console.log('updated user\n', updatedUser);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export { getUserProfile, updateUserProfile };