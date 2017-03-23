import React from 'react'

class Keyword extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table>
        <thead>
          <tr className="keyword-header">
            <th>keywords</th>
            <th>score</th>
          </tr>
        </thead>
        <tbody>
          {this.props.keywords.map((keyword, index) => {
            return (
              <tr key={index}>
                <td>{keyword.class}</td>
                <td>{keyword.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Keyword;
