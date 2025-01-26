const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'my-email@gmail.com',
        pass: 'my-email-password',
    },
});
const sendResetEmail = async (email, token) => {
    const mailOptions = {
        from: 'no-reply@example.com',
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link to reset your password: http://localhost:3000/reset-password?token=${token}`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return true; 
    } catch (error) {
        console.error('Error sending email:', error);
        return false; 
    }
};
module.exports = { sendResetEmail };
