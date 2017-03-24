import React, { Component } from 'react';
import Word from './Word.jsx';
import TextToSpeechV1 from 'watson-developer-cloud/text-to-speech/v1';
import axios from 'axios';

class WordTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      soundFiles: {}
    }

    this.text_to_speech = new TextToSpeechV1 ({
      //these shouldn't be hardcoded, should be referenced from config
      username: '1179c1d9-331e-43ba-a5e2-2fd2e2e4da1e',
      password: '2B7kfkEv1krR'
    });

    this.synthesize = this.synthesize.bind(this);
  }

  synthesize (word, language) {
    console.log('IN SYNTHESIZE');
    console.log(word)
    console.log(language)
    axios.post('/api/speech', {text: word, voice: language, accept: 'audio/wav'} )
      .then((res) => {
        let newFiles = this.state.soundFiles;
        newFiles[res.data.word] = res.data.location
        this.setState({
          soundFiles: newFiles
        });
        console.log('CURRENT STATE: ', this.state);
      })
      .catch((err) => {
        console.log('FOUND AN ERROR IN SYNTHESIZE: ', err);
      })
    // console.log(fs, 'CREATE WRITE');
    // let params = {
    //   text: word,
    //   voice: language,
    //   accept: 'audio/wav'
    // }
    // let file = __dirname + '../public/' + word + '.wav'
    // this.text_to_speech.synthesize(params)
    //   .on('error', function (error) {
    //     console.log('Error: ', error);
    //   })
    //   .pipe(fs.createWriteStream(file));
  }



  render() {
    console.log(`wordtile: this.props.soundWaveHandler: ${this.props.soundWaveHandler}`);
    return this.props.wordTiles.length > 0 ? (
      <div className="wordTiles pre-scrollable postScroller">
        { this.props.wordTiles.map((word, index) => 
        <Word key={index} word={ word } soundWaveHandler={this.props.soundWaveHandler} sound={this.state.soundFiles} synthesize={this.synthesize} spokenLanguage={this.props.spokenLanguage}/>
        )}
      </div>
    ) : (
      <div className="wordTiles pre-scrollable postScroller">
        { this.props.keywords.map((keyword, index) => 
          <div className="wordTile Post" >
            <div>{ keyword.class }</div>
            <div>{`${ Math.floor(keyword.score*100) }%`}</div>
          </div>
        )}
      </div>
    )
  }
}

export default WordTile;