import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { connect } from 'react-redux';

class Adherence extends Component {
  render() {
    return (
      <div className="column left-col">
        <div style={{ width: "80%", stroke: "white", strokeLinecap: "round", }}>
          { this.props.adherence || this.props.adherence === 0 ?
            <div>
              <CircularProgressbar percentage={Math.round(this.props.adherence)} strokeWidth="5" />
              <p>Your Daily Adherence</p>
            </div>
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
