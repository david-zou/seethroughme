const watson = require('watson-developer-cloud');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const axios = require('axios');
const utility = require('./utility.js');
const { API_KEY_TRANSLATE, API_KEY_VR } = require('./config.js');
const path = require('path');
const fs = require('fs');


const speechHandler = function (req, res, next) {
  let text_to_speech = new TextToSpeechV1 ({
      //these shouldn't be hardcoded, should be referenced from config
      username: '1179c1d9-331e-43ba-a5e2-2fd2e2e4da1e',
      password: '2B7kfkEv1krR'
    });

    let newText = req.body.text;

    if (newText.includes(' ')) {
      newText = newText.split(' ').join('')
    }

    let params = {
      text: req.body.text,
      voice: req.body.voice,
      accept: 'audio/wav'
    }
    console.log(__dirname);
    let file = __dirname + '/../public/soundFiles/' + newText + '.wav'
    let fileLoc = 'http://localhost:8080/soundFiles/' + newText + '.wav'
    if (__dirname === '/root/github/seethroughme/server') {
      fileLoc = 'http://192.241.192.221:8080/soundFiles/' + newText + '.wav';
    }
    text_to_speech.synthesize(params)
      .on('error', function (error) {
        console.log('Error: ', error);
      })
      .pipe(fs.createWriteStream(file))
      .on('finish', function () {
        console.log('finished writing: ', fileLoc)
        res.send({word: params.text, location: fileLoc});
        next();
      });
}

const vrHandler = function(req, res, next) {
  console.log("/upload being called");
  const imgURL = req.body.url;
  // check if the imgURL is empty or valid url
  if (!imgURL || !utility.isValidUrl(imgURL)) {

    console.log("client didn't provide image url or url is not valid or file is too large");
    res.status(400).send("bad request");
    return;
  }



  const visual_recognition = watson.visual_recognition({
    api_key: API_KEY_VR,
    version: 'v3',
    version_date: '2016-05-20'
  });
  let params = {
    url: imgURL

  };

  let imagename = imgURL.replace(/http:\/\/localhost:8080\/uploads\//i, '');

  if (params.url.includes('localhost') ) {
    params = {
      images_file: fs.createReadStream(__dirname + '/../public/uploads/' + imagename)
    };
  }

  console.log('CALLING VISUAL RECOGNITION');

  visual_recognition.classify(params, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results.images[0].classifiers[0].classes);
      const keywords = results.images[0].classifiers[0].classes;

      res.send(keywords);
      next();
    }
  })
}

const translateHandler = (req, res) => {
  //JSO's notes to translateAPI
  //on client side, req should be sent as an object with the following properties:
  //keyword (word to be translate), source (source language) and target (target language);
  let { keywords, source, target } = req.body;

  console.log('keywords are: ', keywords);
  console.log('source is: ', source);
  console.log('target is: ', target);

  //https://translation.googleapis.com/language/translate/v2?key=AIzaSyBEb2nG4J6FMbY-3cmXBWL9nCGWp-fsx78&source=en&target=de&q=Hello%20world&q=My%20name%20is%20Jeff&q=dog
  //will need some function to transform source and target to values the api will accept (i.e. english should be 'en')

  let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY_TRANSLATE}&source=${source}&target=${target}`;

  keywords.forEach((k) => {
    let query = k.split(' ').join('%20');
    url += `&q=${query}`
  })

  axios.get(url).then((results) => {
    res.send(results.data);
  });

  // axios.get(url).then((results) => {
  //   res.send(results);
  // })

  // res.send(url);
}

const rerouteHandler = (req, res) => {
  res.redirect('/');
}

const uploadImage = (req, res, next)=>{
  let file = req.files[0];
  console.log('req.files[0]:', req.files[0]);
  console.log('Uploaded image to \'' + file.path + '\'');
  console.log('path.join:', path.join('uploads', file.filename));
  res.send(path.join('uploads', file.filename));

}

module.exports = {
    vrHandler: vrHandler,
    translateHandler: translateHandler,
    rerouteHandler: rerouteHandler,
    uploadImage: uploadImage,
    speechHandler: speechHandler
}




