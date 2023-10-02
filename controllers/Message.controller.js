const Message = require("../models/Message.model");
const transporter = require("../NodeMailer");

exports.postMessage = async (req, res) => {
  const { fullname, email, message } = req.body;
  const errors = validReqBody(req.body);
  if (isEmptyObject(errors)) {
    try {
      await Message.create({ name: fullname, email, message });
      let mailOptions = {
        from: "",
        subject: `Message from ${email}`,
        text: `${fullname} sent: ${message}`,
        to: "justin.lowe53@yahoo.com",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return;
        }
      });
      return res.status(201).json({ message: "Message Sent" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Unable to send message, please try again later" });
    }
  } else {
    return res.status(400).json(errors);
  }
};

//utis functions

function validReqBody(reqBody) {
  const { fullname, email, message } = reqBody;
  const errors = {};

  if (!fullname?.trim()) {
    errors.name = "Name is required";
  }
  if (!email?.trim()) {
    errors.email = "Email is required";
  }
  if (email?.trim()) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.invalidEmail = "Invalid email";
    }
  }
  if (!message?.trim()) {
    errors.message = "Message is required";
  }

  return errors;
}

function isEmptyObject(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}
