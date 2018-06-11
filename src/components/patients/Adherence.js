import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { connect } from 'react-redux';

class Adherence extends Component {
  render() {
    return (
      <div>
        <h1>Your Daily Adherence</h1>
        <div style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 10, width: "40%", stroke: "#3e98c7", strokeLinecap: "round", }}>
          { this.props.adherence || this.props.adherence === 0 ?
            <CircularProgressbar percentage={this.props.adherence} strokeWidth="5" />
            :
            "Loading adherence tracker..."
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    adherence: state.user.adherence
  }
}

export default connect(mapStateToProps)(Adherence);
