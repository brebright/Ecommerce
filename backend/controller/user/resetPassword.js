// Reset password
const User = require('../../models/userModel');

const resetPassword = async (req , res) =>{
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
    
            if (!user || user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
                return res.status(400).json({ success: false, message: 'Invalid or expired token' });
            }
    
            // Update password
            user.password = newPassword; // Ensure to hash the password before saving in a real app
            user.resetToken = undefined;
            user.resetTokenExpiry = undefined;
            await user.save();
    
            res.json({ success: true, message: 'Password has been reset' });
        }
    
 catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = resetPassword


   