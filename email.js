const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');

const email = express.Router();
const upload = multer();

email.post('/', upload.single("image"), async (req, res) => {
  try {
    const { requiredInfo, name, email, paymentMethod, purchaseType, pricePaid } = req.body;
    const image = req.file;

    const str = Object.entries(JSON.parse(requiredInfo)).map(([key,value])=>{
      return `${key}: ${value}`
    }).join('\n');
    console.log(str);

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.smtpUser,
        pass: process.env.smptPass,
      }
    });

    await transport.sendMail({
      from: process.env.smtpUser,
      to: process.env.smtpUser,
      subject: `Purchased ${purchaseType} by ${name}`,
      text: `
    ${str}
    Name: ${name}
    Email: ${email}
    Payment Method: ${paymentMethod}
    purchased: ${purchaseType}
    paid: ${pricePaid}`,
      attachments: image
        ? [
          {
            filename: image.originalname,
            content: image.buffer,
            contentType: image.mimetype,
          },
        ]
        : [],
    });
    res.json({ ok: 'ok' });
  }
  catch(err){
    console.error(err);
    res.status(500).json({sucess: false, error: err.message});
  }
});

module.exports = email;