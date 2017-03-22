// TranslateResult component contain drop down menu allow user to select language
// display the translated word from API
import React, { Component } from 'react';
import axios from 'axios';


class TranslateResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: [],
      targetLanguage: 'en'
    }

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.onDropdownSelect = this.onDropdownSelect.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const mappedKeywords = this.props.keywords.map(v => v.class);
    this.setState({
      keywords: mappedKeywords
    });
  }

  onDropdownSelect(e) {
    var language = '';
    if (e.target.value === 'English') {
      language = 'en';
    } else if (e.target.value === 'Spanish') {
      language = 'es';
    } else if (e.target.value === 'Chinese') {
      language = 'zh-CN';
    } else if (e.target.value === 'French') {
      language = 'fr';
    } else if (e.target.value === 'Hindi') {
      language = 'hi';
    } else if (e.target.value === 'Korean') {
      language = 'ko';
    } else if (e.target.value === 'Hebrew') {
      language = 'iw';
    } else if (e.target.value === 'German') {
      language = 'de';
    } else if (e.target.value === 'Japanese') {
      language = 'ja';
    }

    this.setState({
      targetLanguage: language
    }, () => {
      // console.log(this.state.keywords, this.state.targetLanguage);
      axios.post('/api/translate', { keywords: this.state.keywords, source: 'en', target: this.state.targetLanguage })
        .then((result) => {
          var translations = result.data.data.translations.map(v => v.translatedText);
          this.props.getTranslation(translations);
        });
    });
  }

  render() {
    return (
      <table className="translation-results-container">
        <thead className="dropdown-item">
          <tr className="target-language">
            <th><span>target language </span></th>
            <th><select name="languagelist" form="languageform" onChange={this.onDropdownSelect}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Chinese">Chinese</option>
              <option value="French">French</option>
              <option value="Hindi">Hindi</option>
              <option value="Korean">Korean</option>
              <option value="Hebrew">Hebrew</option>
              <option value="German">German</option>
              <option value="Japanese">Japanese</option>
            </select></th>
          </tr>
        </thead>
        {/*<tbody className="translated-item">
          {this.state.translatedKeywords.map((keyword, index) => {
            return (
              <tr key={index}>
                <td>{keyword}</td>
              </tr>
            )
          })}
        </tbody>*/}
      </table>
    )
  }
}

export default TranslateResult;