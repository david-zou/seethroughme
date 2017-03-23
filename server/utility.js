const path = require('path');
const multer = require('multer');

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

module.exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

const maxSize = 2097152;  // 2 MB File Limit in bytes

const multerStorageTemplate = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb)=>{
    let fileName = path.parse(file.originalname).name;
    let fileExtension = path.parse(file.originalname).ext;
    fileExtension = (fileExtension==='.jpg') ? '.jpeg' : '.jpg';
    cb(null, 'new-' + fileName + fileExtension);
  }
})

module.exports.fileParser = multer({
  storage: multerStorageTemplate,
  limits: { fileSize: maxSize }
});