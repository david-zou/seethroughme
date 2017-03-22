import React, { Component } from 'react';
import Word from './Word.jsx';

class WordTile extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="wordTiles pre-scrollable postScroller">
        { this.props.wordTiles.map((word, index) => 
          <Word key={index} word={ word } />
        )}
      </div>
    )
  }
}

export default WordTile;