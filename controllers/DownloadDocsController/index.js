const path = require('path');
exports.downloadDocs = async(req, res, next) => {
    try {
        const filePath = path.join(process.cwd() + '/public/documents/realCv.pdf');

        res.download(filePath);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};