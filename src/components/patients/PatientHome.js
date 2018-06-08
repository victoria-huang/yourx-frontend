import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPrescription } from '../../actions/prescriptions'
import { logout } from '../../actions/user'
import Adherence from './Adherence'

class PatientHome extends Component {

  handleLogout = () => {
    this.props.logout()
    this.props.history.push("/")
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        Patient Home
        <Adherence />
        <button onClick={this.props.addPrescription}>Add Prescription</button>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addPrescription: addPrescription,
    logout: logout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome)
