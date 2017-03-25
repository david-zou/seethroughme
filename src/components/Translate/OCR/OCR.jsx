import React, { Component } from 'react';
import Tesseract from 'tesseract.js';

 class OCR extends Component {
   constructor(props) {
     super(props);

     this.state = {
      //  ocrString: null
     }
   }

  componentWillMount() {
    let context = this;
    Tesseract.recognize(this.props.imgURL, {
      lang: 'eng',
      tessedit_char_blacklist: 'e'
    })
    .then(function(result){
      console.log('OCR RESULTS:', result.text);
      context.props.transcribe(result.text);
    });
  }

  render() {
    console.log('this.props.ocrString:', this.props.ocrString);
    return (
        <div className="OCRTile">
          <p className="translate-header" style={{display: "inline", fontSize:"14px", fontWeight:"bold"}}>Transcription</p>
          <div>
            { !this.props.ocrString ? (<img src="assets/spinner2.gif" />) : this.props.ocrString}
          </div>
        </div>
    )
  }
  
}

export default OCR;
