// Results React Component contain dropdown list and translate Results
import React, { Component } from 'react';
// import Keyword from './Keyword/Keyword.js';
import TranslateResult from './Translate/TranslateResult.js';
import WordTile from './WordTile/WordTile.jsx';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordTiles: []
    }

    this.getTranslation = this.getTranslation.bind(this);
  }

  getTranslation(translations) {
    console.log('translations in results.js: ', translations);
    console.dir(`this.props.keywords[0].class: ${this.props.keywords[0].class}`);
    let newwords = this.props.keywords.map((keyword, index) => {
      console.log(`keyword: ${keyword}`);
      keyword.translation = translations[index];
      return keyword;
    }
    );
    console.log('newwords[1]: ', newwords[1]);
    this.setState ({
      wordTiles: this.state.wordTiles.concat(newwords)
    })
  }

  render() {
    return (
      <div className="results-container, tile">
        <div className="results-item"><TranslateResult keywords={this.props.keywords} getTranslation={this.getTranslation} /></div>
        <WordTile wordTiles={ this.state.wordTiles } />
      </div>
    )
  }
}

export default Results;