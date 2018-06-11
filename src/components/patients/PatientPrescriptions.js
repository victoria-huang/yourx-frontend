import React, { Component } from 'react';

class PatientPrescriptions extends Component {
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

export default PatientPrescriptions;
