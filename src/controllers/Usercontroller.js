const User = require("../models/User"); // adjust filename to match your actual model
const asyncHandler = require("../utils/asyncHandler");

// GET /user — fetch the logged-in user's profile
// Used by ViewProfile.jsx
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
});

// PUT /user — update the logged-in user's profile (currently just name)
// Used by ViewProfile.jsx's "Edit name" flow
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
});

// DELETE /user — permanently delete the logged-in user's account
// Used by Settings.jsx's danger-zone "Delete account" flow
exports.deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // If you also want to wipe their transactions, uncomment and adjust:
  // const Transaction = require("../models/Transaction");
  // await Transaction.deleteMany({ user: req.user.id });

  res.json({ message: "Account deleted" });
});

exports.changePasswordHandler = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
 
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new password are required" });
    }
 
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
 
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
 
    res.json({ message: "Password updated successfully" });
  } );
