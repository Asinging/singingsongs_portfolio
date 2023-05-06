var express = require('express');
var router = express.Router();
const { sendEmail } = require('../controllers/SendEmailController/index');
const { downloadDocs } = require('../controllers/DownloadDocsController/index');
console.log('i came to the route');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/docs/downloadPdf', downloadDocs);
router.get('/', function(req, res) {
   res.render('index', { title: 'Express', message: 'Welcome to Express' });
});
router.post('/email/submit', sendEmail);
module.exports = router;
