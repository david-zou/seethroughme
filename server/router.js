const express = require('express');
const requestHandlers = require('./requestHandlers.js');
const utility = require('./utility.js')

const router = express.Router();

router.post('/upload', requestHandlers.vrHandler);

router.post('/speech', requestHandlers.speechHandler);

router.use('/img', utility.fileParser.any());

router.post('/img', requestHandlers.uploadImage);

router.post('/translate', requestHandlers.translateHandler);

router.post('/translateTranscription', requestHandlers.translateTranscriptionHandler);


module.exports = router;
  
