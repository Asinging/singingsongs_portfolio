'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
module.exports = async emailObj => {
   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing
   let testAccount;
   try {
      testAccount = await nodemailer.createTestAccount();
   } catch (err) {
      console.log('creating test email failed');
   }

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      // auth: {
      //    user: testAccount.user, // generated ethereal user
      //    pass: testAccount.pass // generated ethereal password
      // }
      auth: {
         user: testAccount.user, // generated ethereal user
         pass: testAccount.pass // generated ethereal password
      }
   });

   try {
      // send mail with defined transport object
      let info = await transporter.sendMail({
         from: emailObj.emailFrom, // sender address
         to: 'ejesunday2@gmail.com,', // list of receivers
         subject: `${emailObj.fullName} <br> ${emailObj.subject}`, // Subject line
         text: emailObj.emailBody, // plain text body
         html: `${emailObj.fullName} <br>Hello world?</b>` // html body
      });

      console.log('Message sent: %s', info);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
   } catch (err) {
      console.log(err);
      throw 'error trying to send email';
   }
};
