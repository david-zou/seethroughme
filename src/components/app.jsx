import React from 'react';
import Input from './Input/Input.jsx';
import Translate from './Translate/Translate.jsx';
import axios from 'axios';
import { browserHistory } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="app-container">
        <Input
          progressVisible={this.props.progressVisible}
          changeParentUrl={this.props.changeParentUrl}
          fetchIBM={this.props.fetchIBM}
        />
      </div>
    )
  }

}

export default App;