const nodemailer = require('nodemailer');

const sendOrderConfirmation = (userEmail, order) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'yourstore@example.com',
    to: userEmail,
    subject: 'Order Confirmation',
    text: `Thank you for your order! Your order number is ${order._id}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendOrderConfirmation;
