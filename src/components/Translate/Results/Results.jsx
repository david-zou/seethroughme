// Results React Component contain dropdown list and translate Results
import React, { Component } from 'react';
// import Keyword from './Keyword/Keyword.js';
import TranslateResult from './Translate/TranslateResult.jsx';
import WordTile from './WordTile/WordTile.jsx';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordTiles: [],
      spokenLanguage: '',
      playing: false
    }

    this.getTranslation = this.getTranslation.bind(this);
    this.spokenLanguages = {
      en: 'en-US_AllisonVoice',
      de: 'de-DE_DieterVoice',
      es: 'es-ES_LauraVoice',
      fr: 'fr-FR_ReneeVoice',
      it: 'it-IT_FrancescaVoice',
      ja: 'ja-JP_EmiVoice',
      pt: 'pt-BR_IsabelaVoice'
    };
    this.spokenLanguage = '';
    this.soundWaveHandler = this.soundWaveHandler.bind(this);
  }

  getTranslation(translations, newLanguage) {
    console.log('translations in results.js: ', translations);
    console.dir(`this.props.keywords[0].class: ${this.props.keywords[0].class}`);
    let newwords = this.props.keywords.map((keyword, index) => {
      console.dir(keyword, 'KEYWORD');
      keyword.translation = translations[index];
      return keyword;
    });
    console.log('newwords[1]: ', newwords[1]);
    this.setState ({
      wordTiles: newwords,
      spokenLanguage: this.spokenLanguages[newLanguage]
    })
  }

  soundWaveHandler() {
    console.log(`this.state.playing: ${this.state.playing}`);
    this.setState({
      playing: !this.state.playing
    })
  }

  render() {
    return (
      <div className="results-container, tile">
        <div className="results-item">
          <div style={{display: "block", margin: "10px"}}>
            <p className="translate-header" style={{display: "inline", fontSize:"14px", fontWeight:"bold"}}>Click to translate!</p>
          </div>
          <TranslateResult keywords={this.props.keywords} getTranslation={this.getTranslation} playing={this.state.playing} />
        </div>
        <WordTile keywords={this.props.keywords} wordTiles={ this.state.wordTiles } spokenLanguage={this.state.spokenLanguage} soundWaveHandler={this.soundWaveHandler}/>
      </div>
    )
  }
}

export default Results;