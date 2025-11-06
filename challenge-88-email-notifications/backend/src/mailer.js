const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'localhost',
  port: process.env.SMTP_PORT || 1025,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'test',
    pass: process.env.SMTP_PASS || 'test'
  }
});

// Send an email
const sendEmail = async (emailData) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@example.com',
    to: emailData.recipient,
    subject: emailData.subject,
    html: emailData.body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Render a template with data
const renderTemplate = async (templateName, data) => {
  try {
    const templatePath = path.join(__dirname, 'templates', `${templateName}.hbs`);
    const templateContent = await fs.readFile(templatePath, 'utf8');
    const template = handlebars.compile(templateContent);
    return template(data);
  } catch (error) {
    console.error('Error rendering template:', error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  renderTemplate
};