const path = require('path');

exports.downloadDocs = async (req, res, next) => {
   try {
      const filePath = path.join(__dirname + '/public/documents/test.pdf');
      console.log(filePath);
      res.download(filePath);
   } catch (err) {
      console.log(err);
      res.send('Error');
   }
};
