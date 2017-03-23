import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router';
import axios from 'axios';

import Input from './components/Input/Input.jsx';
import Translate from './components/Translate/Translate.js'
import './styles/index.css';
import App from './components/app.jsx'

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: [],
      imgURL: '',
      imageURL: "",
      progressVisible: false
    }

    this.setRootKeywords = this.setRootKeywords.bind(this);
    this.setRootUrl = this.setRootUrl.bind(this);
    this.fetchIBM = this.fetchIBM.bind(this);
    this.handleImageSubmission = this.handleImageSubmission.bind(this);
    this.changeParentUrl = this.changeParentUrl.bind(this);
    this.handleSpinningProgress = this.handleSpinningProgress.bind(this);
  }

  componentDidUpdate() {
    console.log('- component did update', this.state);
  }

  setRootKeywords(keywords) {
    this.setState({ keywords }, () => {
      browserHistory.push('/translate');
    })
  }

  setRootUrl(url) {
    console.log('CALLING SETROOTURL:', url);
    this.setState({ imgURL: url });
  }

  // request server /api/upload to receive the ibm results
  // allow passing callback
  fetchIBM(cb) {
    // if the image exists (has been updated by user giving img url or drop down a image) 
    if (this.state.imageURL) {
      console.log('POSTING FROM FETCHIBM');
      axios.post('/api/upload', { url: this.state.imageURL })
        .then(res => {
          res.data.sort(function (a,b) {
            return b.score-a.score;
          });
          this.setState({ keywords: res.data }, () => {
            cb(true);
          });
        })
        .catch(err => {
          console.log("In App.jsx, request server /api/upload");
          cb(false);
        })
    }
  }

  handleImageSubmission() {
    if (this.state.imageURL.length > 0) {
      console.log('State changed to: ', this.state.imageURL);
      this.fetchIBM(success => {
        if (success) {
          console.log("fetchIBM success the state.keywords ", this.state.keywords);
          this.setRootKeywords(this.state.keywords)
        } else {
          console.log("fetchIBM failed");
        }
      });

    }
  }

  changeParentUrl(url) {
    console.log('CALLING CHANGEPARENTURL:', url);
    this.setState({ imageURL: url }, () => {
      this.setRootUrl(this.state.imageURL);
      this.handleImageSubmission();
    });
  }

  handleSpinningProgress() {
    this.setState({
    	progressVisible: !this.state.progressVisible      
    })
  }

  render() {
    const { children } = this.props;

    return (
      <div className="react-root">     
        { children && 
        React.cloneElement(children, 
        { setRootKeywords: this.setRootKeywords, 
        keywords: this.state.keywords, 
        handleSpinningProgress: this.handleSpinningProgress,
        progressVisible: this.state.progressVisible,
        setRootUrl: this.setRootUrl,
        imgURL: this.state.imgURL,
        imageURL: this.state.imageURL,
        changeParentUrl: this.changeParentUrl,
        fetchIBM: this.fetchIBM
        })}
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory} >
    <Route path='/' component={Root}>
      <IndexRoute component={App} />
      <Route path='/translate' component={Translate} />
    </Route>
  </Router>
), document.getElementById('container'));