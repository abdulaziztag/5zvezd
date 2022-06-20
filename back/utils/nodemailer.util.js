import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

const user = process.env.user;
const pass = process.env.password;

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass,
  },
});

export const sendConfirmationEmail = (firstName, lastName = '', email, confirmationCode, res) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: 'Please confirm your account',
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${firstName} ${lastName}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:4200/auth/confirmation/${confirmationCode}> Click here</a>
        </div>`,
  }, (err) => {
    if (err) {
      res.send({message: 'Error while sending confirmation message, please try again later!'});
      return;
    }
    res.send({
      message:
        'User was registered successfully! Please check your email',
    });
  });
};
