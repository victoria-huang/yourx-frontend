import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, fetchPatient } from '../../fetches';
import { setUser } from '../../actions/user'
import { addPrescription, setAllPrescriptions } from  '../../actions/prescriptions'
import MedsContainer from './MedsContainer'
import PrescriptionForm from '../prescriptions/PrescriptionForm'

const DEFAULT_STATE = {
  addRxClicked: false,
  clicked: false,
  whichClicked: ''
}

class PatientPrescriptions extends Component {
  state = {
    ...DEFAULT_STATE
  }

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
      .then(json => {
        this.props.setAllPrescriptions(json.prescriptions);
      })
    })
  }

  handleClick = (event) => {
    this.setState({
      clicked: true,
      whichClicked: event.target.name
    })
  }

  handleAddRx = () => {
    this.setState({
      addRxClicked: !this.state.addRxClicked
    })
  }

  render() {
    return (
      <div>
        Patient Prescriptions

        <button onClick={this.handleClick} name="mon">Monday</button>
        <button onClick={this.handleClick} name="tues">Tuesday</button>
        <button onClick={this.handleClick} name="wed">Wednesday</button>
        <button onClick={this.handleClick} name="thurs">Thursday</button>
        <button onClick={this.handleClick} name="fri">Friday</button>
        <button onClick={this.handleClick} name="sat">Saturday</button>
        <button onClick={this.handleClick} name="sun">Sunday</button>
        <button onClick={this.handleAddRx}>Add Prescription</button>
        <button onClick={() => this.props.history.push("/patient-home")}>Home</button>

        { this.state.clicked && <MedsContainer day={this.state.whichClicked} /> }

        { this.state.addRxClicked && <PrescriptionForm patientId={this.props.user.userId} addPrescription={this.props.addPrescription} /> }
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
    addPrescription: addPrescription,
    setAllPrescriptions: setAllPrescriptions
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientPrescriptions);
