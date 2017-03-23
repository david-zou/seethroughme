import React, { Component } from 'react';
import Word from './Word.jsx';

class WordTile extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return this.props.wordTiles.length > 0 ? (
      <div className="wordTiles pre-scrollable postScroller">
        { this.props.wordTiles.map((word, index) => 
          <Word key={index} word={ word } />
        )}
      </div>
    ) : (
      <div className="wordTiles pre-scrollable postScroller">
        { this.props.keywords.map((keyword, index) => 
          <div className="wordTile Post" >
            <div>{ keyword.class }</div>
            <div>{ keyword.score }</div>
          </div>
        )}
      </div>
    )
  }
}

export default WordTile;