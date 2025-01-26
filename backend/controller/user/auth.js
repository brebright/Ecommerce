const express = require('express');
const crypto = require('crypto');
const User = require('../models/userModdel');
const nodemailer = require('nodemailer');
const router = express.Router();

// Forgot Password Route
router.post('/forgot', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send('No user found with that email');

  user.generatePasswordReset();
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user: 'your-email@gmail.com', pass: 'your-email-password' },
  });

  const mailOptions = {
    to: user.email,
    from: 'passwordreset@example.com',
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           http://${req.headers.host}/reset/${user.resetPasswordToken}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) return res.status(500).send('Error sending the email');
    res.status(200).send('Password reset email sent');
  });
});

// Reset Password Route
router.post('/reset/:token', async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) return res.status(400).send('Password reset token is invalid or has expired');

  user.password = bcrypt.hashSync(req.body.password, 8);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  res.status(200).send('Password has been reset');
});

module.exports = router;
