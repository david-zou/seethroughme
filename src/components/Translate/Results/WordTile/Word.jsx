import React from 'react';



class Word extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.sound[props.word.translation],
    }
  }

  render() {
    let audio = () => {
      console.log('AUDIO URL', this.props.sound[this.props.word.translation]);
      if (this.props.sound[this.props.word.translation]) {
        return <div>
                    <audio id={this.props.word.translation} >
                      <source src={this.props.sound[this.props.word.translation]} type="audio/wav" />
                    </audio>
                    <button className="translateButton" onClick={playSong}>Translate</button>
                  </div>         
      } else {
        return null;
      }
    }

    let playSong = () => {
      console.log(this.props.word.translation, "WORD BEING PLAYED")
      console.log(this.props.sound, 'OBJECT WITH ALL WORDS')
      let audio = document.getElementById(this.props.word.translation);
      console.log(audio);
      audio.play();
      this.props.soundWaveHandler();
      audio.onended = () => {
        this.props.soundWaveHandler();
      }
    }

    return (
      <div className="wordTile Post" onClick={ () => {(this.props.sound[this.props.word.translation]) ? null : this.props.synthesize(this.props.word.translation, this.props.spokenLanguage)}}>
        <div>{ this.props.word.class }</div>
        <div>{ `${ Math.floor(this.props.word.score*100) }%` }</div>
        <div>{ this.props.word.translation }</div>
        <div>
          {audio()}
        </div>
      </div>
    )
  }
}
/*
const Word = ({ word,spokenLanguage,sound }) => {
  console.log('SOUNDWORD: ', sound[word.translation]);
  console.log('TYPE OF SOUND WORD', typeof(sound[word.translation]));
  this.state = {
    url: sound[word.translation]
  }
  return (
    <div className="wordTile Post" >
      <div>{ word.class }</div>
      <div>{`${ Math.floor(word.score*100) }%`}</div>
      <div>{ word.translation }</div>
      <div>
        <audio controls>
          <source src={this.state.url} type="audio/wav" />
        </audio>
      </div>
    </div>
  )
}*/

export default Word;


      {/*<audio controls>
        <source src={sound[word.translation]} type="audio/wav" />
      </audio>*/}