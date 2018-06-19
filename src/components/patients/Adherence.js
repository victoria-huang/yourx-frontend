import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
import { connect } from 'react-redux';

class Adherence extends Component {
  render() {
    return (
      <div className="header-column left-col">
        <div style={{ stroke: 'white', path: { stroke: `rgba(71, 255, 156, ${this.props.adherence / 100})` },}}>
          { this.props.adherence || this.props.adherence === 0 ?
            <div>
              <CircularProgressbar percentage={Math.round(this.props.adherence)} strokeWidth="5" />
              <p>My Daily Adherence</p>
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
