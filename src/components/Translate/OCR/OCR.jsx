import React, { Component } from 'react';
import Tesseract from 'tesseract.js';

 class OCR extends Component {
   constructor(props) {
     super(props);

     this.state = {
       ocrString: null
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
      context.setState({
        ocrString: result.text
      });
    });
  }

  render() {
    return (
        <div className="OCRTile">
          <p className="translate-header" style={{display: "inline", fontSize:"14px", fontWeight:"bold"}}>Transcription</p>
          <div>
            { !this.state.ocrString ? (<img src="assets/spinner2.gif" />) : this.state.ocrString}
          </div>
        </div>
    )
  }
  
}

export default OCR;
