const emailSenderModule = require('../../emailer.js');

exports.sendEmail = async (req, res, next) => {
   if (!req.body) {
      res.send('bad');
      throw Error('Missing');
   }

   let requestBody = req.body;

   try {
      let email = await emailSenderModule(requestBody);
      res.json({
         data: email,
         message: 'Email successfull sent',
         status: 200
      });
   } catch (err) {
      console.log(err);
      res.send('Error');
   }
};
