import React, { Component } from 'react';
import DragDrop from './DragDrop.jsx';
import { browserHistory } from 'react-router';
//import '../../styles/App.css';

class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleUrlUpdate = this.handleUrlUpdate.bind(this);
  }

  handleUrlUpdate(event){
    this.setState({
      url: event.target.value
    });
  }

  handleClick(event){
    event.preventDefault();
    this.props.changeParentUrl(this.state.url);
    this.setState({
      url: ''
    });
  }

  render() {
    return (
      <div className="input-container">
        <div className="url-input">
          <div className="input-header">translate a picture</div>

          <div className="url-input-field">
            <form onSubmit={this.handleClick}>
              <div className="row">
              <input className="input"
                type="text"
                value={this.state.url}
                onChange={this.handleUrlUpdate}
                placeholder="copy --> paste --> enter"
              />
              <input className="btn btn-primary submitButton" type="submit" value="Submit"/></div>
              <div className="row spinner">{this.props.progressVisible ? <Spinner/> : ''}</div>
            </form>
          </div>

          <div className="input-separator">-- or --</div>
        </div>


        <DragDrop className="dragdrop-input" changeParentUrl={this.props.changeParentUrl} />
      </div>
    );
  }
}

const Spinner = () => {
  return (
    <img className="spinner" src={"assets/spinner.gif"} />
  );
}

export default Input;
