import nodemailer from 'nodemailer'
import resetEmailTemplate from './resetEmailTemplate.js';
export default async function sendResetMail(option){
const transporter =nodemailer.createTransport({
 service:"gmail",
  secure:true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "sonbaty1937@gmail.com",
    pass: "ynnm msiu zzyq soae",
  }, 
});
   const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <sonbaty1937@gmail.com>', // sender address
    to: option.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "mnwor eldonya ya wazeer", // plain text body
    html: resetEmailTemplate(option.url), // html body
  });
console.log("Message sent: %s",info.messageId)
}