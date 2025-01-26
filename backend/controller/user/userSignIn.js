const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password", success: false });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const now = new Date();
        const hoursSinceLastAttempt = (now - user.lastLoginAttempt) / (1000 * 60 * 60);

        // Unlock if more than 12 hours have passed since last attempt
        if (user.isLocked && hoursSinceLastAttempt < 12) {
            return res.status(403).json({ message: 'Account locked. Please try again after 12 hours.', success: false });
        }

        // Reset login attempts if more than 12 hours have passed
        if (hoursSinceLastAttempt >= 12) {
            user.loginAttempts = 0; 
            user.isLocked = false; 
        }

        // Update last login attempt time
        user.lastLoginAttempt = now; 
        await user.save(); 

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            user.loginAttempts = 0; 
            user.isLocked = false; 
            await user.save(); 

            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.TOKEN_SECRET_KEY, { expiresIn: 60*60*1000 });
            
            res.cookie('token', token, { httpOnly: true, secure: true }).status(200).json({
                success: true,
                message: 'Logged in successfully',
                user: { id: user.id, email: user.email }
            });
        } else {
            user.loginAttempts += 1; 
            if (user.loginAttempts >= 3) {
                user.isLocked = true; 
            }
            await user.save(); 
            return res.status(401).json({ message: 'Incorrect password', success: false });
        }
    } catch (error) {
        console.error("Sign-in error:", error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

module.exports = userSignInController;
