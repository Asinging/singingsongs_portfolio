var express = require('express');
var router = express.Router();
const { sendEmail } = require('../controllers/SendEmailController/index');
const { downloadDocs, viewDocs } = require('../controllers/DownloadDocsController/index');

router.get('/docs/downloadPdf', downloadDocs);
router.get('/docs/viewPdf', viewDocs);
router.get('/', function(req, res) {
    res.render('index', { title: 'Express', message: 'Welcome to Express' });
});
router.post('/email/submit', sendEmail);
module.exports = router;