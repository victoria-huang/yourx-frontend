import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, fetchPatient } from '../../fetches';
import { setUser } from '../../actions/user'
import { addPrescription } from  '../../actions/prescriptions'

class PatientPrescriptions extends Component {
  componentDidMount() {
    getUser()
    .then(json => this.props.setUser({
      username: json[0].username,
      userId: json[0].user_id,
      userClass: json[0].user_class
    }))
    .then(() => {
      const patient_id = this.props.user.userId

      fetchPatient(patient_id)
      .then(console.log)
    })
  }

  render() {
    return (
      <div>
      Patient Prescriptions

      <button onClick={this.props.addPrescription}>Add Prescription</button>
      <button onClick={() => this.props.history.push("/patient-home")}>Home</button>
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
    setUser: setUser,
    addPrescription: addPrescription
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientPrescriptions);
