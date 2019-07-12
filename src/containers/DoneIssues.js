import React, { Component } from 'react';

// Store
import { connect } from 'react-redux';
import { fetch } from '../store/actions/issues';

class DoneIssues extends Component {
  static defaultProps = {
    issues: []
  };

  componentDidMount() {
    this.props.fetch(['Done']);
  }

  getIssuesByLabel(label) {

  }

  renderIssuesByLabel(label, title) {
    const { issues } = this.props;

    const filterIssues = issues.filter(
      ({ labels }) => labels.indexOf(label) !== -1
    );

    if (filterIssues.length === 0) {
      return null;
    }

    return (
      <div style={{ marginBottom: 20 }}>
        <div>{title}:</div>
        <br />
        {filterIssues.map(({ iid, title }) => (
          <div key={iid}>
            * #{iid} - {title}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <section>
        <section>issues: {this.props.issues.length}</section>
        <br/>
        {this.renderIssuesByLabel('Bug', 'Fix')}
        {this.renderIssuesByLabel('Feature', 'Feature')}
        {this.renderIssuesByLabel('Enhancement', 'Mejoras')}
        {this.renderIssuesByLabel('CC', 'Control de Cambios')}
        {/* {this.renderIssuesByLabel(null, 'Sin Tag')} */}
      </section>
    );
  }
}

const mapStateToProps = ({ issues }) => ({ issues });

const mapDispatchToProps = { fetch };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoneIssues);
