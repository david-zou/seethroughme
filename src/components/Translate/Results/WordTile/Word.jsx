import React from 'react';

const Word = ({ word,spokenLanguage }) => {
  return (
    <div className="wordTile Post" >
      <div>{ word.class }</div>
      <div>{ word.score }</div>
      <div>{ word.translation }</div>
    </div>
  )
}

export default Word;