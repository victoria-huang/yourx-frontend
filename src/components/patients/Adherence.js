import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { fetchPatientAdherence } from '../../fetches'
import { setAdherence } from '../../actions/user'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Adherence extends Component {

  componentDidMount() {
    const patient_id = localStorage.getItem("user_id")
    fetchPatientAdherence(patient_id)
    .then(json => this.props.setAdherence(json))
  }

  render() {
    return (
      <div style={{ width: "200px" }}>
        { this.props.adherence ?
          <CircularProgressbar percentage={this.props.adherence} styles={{
            path: { stroke: `rgba(62, 152, 199, ${60 / 100})` },
          }}/>
          :
          "Loading adherence tracker..."
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    adherence: state.user.adherence
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setAdherence: setAdherence
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Adherence);
