import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { connect } from 'react-redux';

class Adherence extends Component {
  render() {
    return (
      <div>
        <h1>Your Daily Adherence</h1>
        <div style={{ width: "200px" }}>
          { this.props.adherence || this.props.adherence === 0 ?
            <CircularProgressbar percentage={this.props.adherence} styles={{
              path: { stroke: `rgba(62, 152, 199, ${60 / 100})` },
            }}/>
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
