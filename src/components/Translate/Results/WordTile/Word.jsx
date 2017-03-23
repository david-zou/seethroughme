import React from 'react';

const Word = ({ word,spokenLanguage }) => {
  return (
    <div className="wordTile Post" >
      <div>{ word.class }</div>
      <div>{`${ Math.floor(word.score*100) }%`}</div>
      <div>{ word.translation }</div>
    </div>
  )
}

export default Word;