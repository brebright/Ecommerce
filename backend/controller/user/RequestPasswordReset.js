const User = require('../../models/userModel'); 
const jwt = require('jsonwebtoken');
const { sendResetEmail } = require('../../config/mailer'); // Ensure correct path

const RequestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        const emailSent = await sendResetEmail(email, token); // Await the promise

        if (emailSent) {
            return res.json({ success: true, message: 'Password reset email sent' });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to send password reset email.' });
        }
    } catch (err) {
        console.error('Error in RequestPasswordReset:', err);
        res.status(500).json({
            message: err.message || 'An error occurred while processing your request.',
            error: true,
            success: false,
        });
    }
};

module.exports = RequestPasswordReset;