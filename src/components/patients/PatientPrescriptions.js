import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, fetchPatient } from '../../fetches';
import { setUser } from '../../actions/user'
import { addPrescription, setAllPrescriptions } from  '../../actions/prescriptions'
import MedsContainer from './MedsContainer'

const DEFAULT_STATE = {
  monClicked: false,
  tuesClicked: false,
  wedClicked: false,
  thursClicked: false,
  friClicked: false,
  satClicked: false,
  sunClicked: false
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
        const prescriptions = json.prescriptions;
        this.props.setAllPrescriptions(prescriptions);
      })
    })
  }

  handleClick = (event) => {
    this.setState({
      ...DEFAULT_STATE,
      [`${event.target.name}Clicked`]: true
    })

  }

  render() {
    return (
      <div>
      Patient Prescriptions

      <button onClick={this.handleClick} name="mon">Monday</button>
      { this.state.monClicked && <MedsContainer day="mon" /> }

      <button onClick={this.handleClick} name="tues">Tuesday</button>
      { this.state.tuesClicked && <MedsContainer day="tues" /> }

      <button onClick={this.handleClick} name="wed">Wednesday</button>
      { this.state.wedClicked && <MedsContainer day="wed" /> }

      <button onClick={this.handleClick} name="thurs">Thursday</button>
      { this.state.thursClicked && <MedsContainer day="thurs" /> }

      <button onClick={this.handleClick} name="fri">Friday</button>
      { this.state.friClicked && <MedsContainer day="fri" /> }

      <button onClick={this.handleClick} name="sat">Saturday</button>
      { this.state.satClicked && <MedsContainer day="sat" /> }

      <button onClick={this.handleClick} name="sun">Sunday</button>
      { this.state.sunClicked && <MedsContainer day="sun" /> }

      <button onClick={this.props.addPrescription}>Add Prescription</button>
      <button onClick={() => this.props.history.push("/patient-home")}>Home</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.prescriptions)
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
