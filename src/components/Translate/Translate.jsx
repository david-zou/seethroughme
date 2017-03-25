import React, { Component } from 'react';
import ImageView from './ImageView/ImageView.jsx';
import Results from './Results/Results.jsx';
import { Link } from 'react-router';

class Translate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: [],
    }
    
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setState({
      keywords: this.props.keywords,
    });
  }

  render() {
    return (
      <div className="translate-container">
        <div className="backButton"><Link className="btn btn-primary" to="/">Back</Link></div>
        <div className="translate-header">translation results</div>
        <div className="translate-components">
          <div className="image-div"><ImageView imgURL={this.props.imgURL} /></div>
          <div className="results-div"><Results keywords={this.state.keywords} imgURL={this.props.imgURL}/></div>
        </div>
      </div>
    );
  }
}

export default Translate;
