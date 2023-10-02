const Consultation = require("../models/Consultation.model");
const transporter = require("../NodeMailer");
exports.createConsultation = async (req, res) => {
  console.log(req.body);
  const { category, service, agent, consultation_time, fullname, phonenumber } =
    req.body;

  if (
    (!category?.trim() ||
      !service?.trim() ||
      !agent?.trim() ||
      !consultation_time?.trim(),
    !fullname?.trim(),
    !phonenumber?.trim())
  ) {
    return res.status(400).json({ errorMessage: "unable to book consulation" });
  }
  if (!/^\d{3}\s\d{3}\s\d{4}$/.test(phonenumber)) {
    return res.status(400).json({ errorMessage: "invalid phonenumber format" });
  }

  try {
    await Consultation.create({
      category,
      service,
      agent,
      consultation_date: consultation_time,
      name: fullname,
      phone: phonenumber,
    });
    const localDateTime = new Date(consultation_time).toLocaleString();
    const emailMessage = `${fullname} scheduled a consultation for ${localDateTime} with ${agent} regarding ${service}, his/her phone number is ${phonenumber}`;

    let mailOptions = {
      from: process.env.EMAIL, // sender address
      subject: "Consultation", // Subject line
      text: emailMessage,
      to: "justin.lowe53@yahoo.com",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return;
      }
    });
    return res.status(201).json({ message: "Consultation booked" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
