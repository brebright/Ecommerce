// controllers/accountController.js
const userModel = require("../../models/userModel")
// Change password
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user || !(await user.comparePassword(oldPassword))) {
            return res.status(400).json({ message: 'Old password is incorrect', success: false });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password changed successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

// Change email
const changeEmail = async (req, res) => {
    const { newEmail } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found', success: false });

        user.email = newEmail;
        await user.save();
        res.json({ message: 'Email updated successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

// Delete account
const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: 'Account deleted successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

module.exports = { changePassword, changeEmail, deleteAccount };
