const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

//transport
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "please fill the form",
      });
    }

    transporter.sendMail({
      to: "jayanti0987654321@gmail.com",
      from: "jayanti0987654321@gmail.com",
      subject: "Regardig my portfolio",
      html: `
      <h5>Detail information</h5>
      <ul>
      <li><p>Name: ${name}</p></li>
      <li><p>Email: ${email}</p></li>
      <li><p>Message: ${msg}</p></li>
      </ul>`,
    });
    return res.status(200).send({
      success: true,
      message: "send sucessfuuly",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "send mail erroe",
      error,
    });
  }
};

module.exports = { sendEmailController };
