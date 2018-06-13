import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, fetchPatient } from '../../fetches';
import { setUser } from '../../actions/user'
import { addPrescription, setAllPrescriptions, addDose } from  '../../actions/prescriptions'
import MedsContainer from './MedsContainer'
import PrescriptionForm from '../prescriptions/PrescriptionForm'
import PatientNavBar from '../PatientNavBar'

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
      addRxClicked: false,
      clicked: true,
      whichClicked: event.target.name
    })
  }

  handleClickAddRx = () => {
    this.setState({
      addRxClicked: !this.state.addRxClicked,
      clicked: false
    })
  }

  render() {
    return (
      <div>
        Patient Prescriptions
        <PatientNavBar history={this.props.history} />
        <button onClick={this.handleClick} name="mon">Monday</button>
        <button onClick={this.handleClick} name="tues">Tuesday</button>
        <button onClick={this.handleClick} name="wed">Wednesday</button>
        <button onClick={this.handleClick} name="thurs">Thursday</button>
        <button onClick={this.handleClick} name="fri">Friday</button>
        <button onClick={this.handleClick} name="sat">Saturday</button>
        <button onClick={this.handleClick} name="sun">Sunday</button>
        <button onClick={this.handleClickAddRx}>Add Prescription</button>
        <button onClick={() => this.props.history.push("/patient-home")}>Home</button>

        { this.state.clicked && <MedsContainer day={this.state.whichClicked} history={this.props.history} /> }

        { this.state.addRxClicked && <PrescriptionForm patientId={this.props.user.userId} addPrescription={this.props.addPrescription} addDose={this.props.addDose} history={this.props.history} /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    prescriptions: state.prescriptions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser,
    addPrescription: addPrescription,
    setAllPrescriptions: setAllPrescriptions,
    addDose: addDose
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientPrescriptions);
