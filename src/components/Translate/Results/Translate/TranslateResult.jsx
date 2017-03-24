// TranslateResult component contain drop down menu allow user to select language
// display the translated word from API
import React, { Component } from 'react';
import axios from 'axios';
import path from 'path';

class TranslateResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: [],
      targetLanguage: 'en'
    }

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.onLangSelect = this.onLangSelect.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const mappedKeywords = this.props.keywords.map(v => v.class);
    this.setState({
      keywords: mappedKeywords
    });
  }

  onLangSelect(lang) {
    let language = lang;
    
    this.setState({
      targetLanguage: language
    }, () => {
      // console.log(this.state.keywords, this.state.targetLanguage);
      axios.post('/api/translate', { keywords: this.state.keywords, source: 'en', target: this.state.targetLanguage })
        .then((result) => {
          let translations = result.data.data.translations.map(v => v.translatedText);
          this.props.getTranslation(translations, this.state.targetLanguage);
        });
    });
  }

  render() {
    return (
      <div className="img-hover">
        <div className="withAudio">
          <div style={{display: "block"}}>
            <div>{ this.props.playing ? <img className="wave pulse-ring" src={"assets/levels.png"} style={{display: "inline"}}/> : <img className="wave" src={"assets/levels.png"} style={{display: "inline"}}/>  }</div>
            <p className="translate-header">Audio format supported</p>
          </div>
          <div className="flags img-responsive img-rounded" >
            <img className="flagImg" src={"assets/france.png"} onClick={() => {this.onLangSelect("fr")}}/>
          </div>
          <div className="flags img-responsive img-rounded" >
            <img className="flagImg" src={"assets/japan.png"} onClick={() => {this.onLangSelect("ja")}}/>
          </div>
          <div className="flags img-responsive img-rounded" >
            <img className="flagImg" src={"assets/spain.png"} onClick={() => {this.onLangSelect("es")}}/>
          </div>
          <div className="flags img-responsive img-rounded" >
            <img className="flagImg" src={"assets/germany.png"} onClick={() => {this.onLangSelect("de")}}/>
          </div>
          <div className="flags img-responsive img-rounded" >
            <img className="flagImg" src={"assets/portugal.png"} onClick={() => {this.onLangSelect("pt")}}/>
          </div>
          <div className="flags img-responsive img-rounded" >
            <img className="flagImg" src={"assets/italy.png"} onClick={() => {this.onLangSelect("it")}}/>
         </div>
       </div>
       <div className="comingSoon">
{/*         <div style={{display: "block", display: "3px"}}>
            <p className="translate-header">Text-translation only</p>
          </div>*/}
          <div className="flags img-responsive img-rounded" >
            <img className="flagImg" src={"assets/south-korea.png"} onClick={() => {this.onLangSelect("ko")}}/>
          </div>
          <div className="flags img-responsive img-rounded" >
            <img className="flagImg" src={"assets/israel.png"} onClick={() => {this.onLangSelect("iw")}}/>
          </div>
          <div className="flags img-responsive img-rounded" >
            <img className="flagImg" src={"assets/india.png"} onClick={() => {this.onLangSelect("hi")}}/>
          </div>
          <div className="flags img-responsive img-rounded" >
            <img className="flagImg" src={"assets/china.png"} onClick={() => {this.onLangSelect("zh-CN")}}/>
          </div>
        </div>
      </div>
    )
  }
}

const Wave = () => {
  return (
    <img className="wave" src={"assets/soundwave.gif"} style={{display: "inline", margin: "10px"}}/>
  );
}

export default TranslateResult;