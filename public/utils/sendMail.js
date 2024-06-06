const nodemailer = require("nodemailer");

const sendMail = async (
  name,
  email,
  phone_no,
  time_to_connect,
  site_visit_date
) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_APP_PASSWORD,
      },
    });

    // Define email options
    let mailOptions = {
      from: email, // Replace with your email
      to: process.env.QUERY_EMAIL, // Recipient email
      subject: "Form Submission Confirmation",
      text: `Hello Club One,\n\nA User has submitted a query form. Here are their details:\n\nName: ${name}\nEmail: ${email}\nPhone Number: ${phone_no}\nSuitable Time to Connect: ${time_to_connect}\n\nTentative Site Visit Plan: ${site_visit_date}\n\nBest regards,\n Club One Backend Team`,
    };

    let info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {
    return error;
  }
};

module.exports = {
  sendMail,
};
