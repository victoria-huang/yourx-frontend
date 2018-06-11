import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPrescription, setPrescriptions } from '../../actions/prescriptions'
import { setUser, setAdherence, logout } from '../../actions/user'
import { getUser, fetchPatientAdherence, fetchPatientDailyMeds } from '../../fetches'
import Adherence from './Adherence'
import TodaysMedsContainer from './TodaysMedsContainer'

class PatientHome extends Component {
  componentDidMount() {
    getUser()
    .then(json => this.props.setUser({
      username: json[0].username,
      userId: json[0].user_id,
      userClass: json[0].user_class
    }))
    .then(() => {
      const patient_id = this.props.user.userId

      fetchPatientAdherence(patient_id)
      .then(json => this.props.setAdherence(json))

      fetchPatientDailyMeds(patient_id)
      .then(json => this.props.setPrescriptions(json))
    })
  }

  handleLogout = () => {
    this.props.logout()
    this.props.history.push("/")
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        Patient Home
        <br />
        <Adherence />
        <TodaysMedsContainer />
        <button onClick={() => this.props.history.push("/patient-prescriptions")}>All Prescriptions</button>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    prescriptions: state.prescriptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addPrescription: addPrescription,
    setPrescriptions: setPrescriptions,
    setUser: setUser,
    setAdherence: setAdherence,
    logout: logout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome)
