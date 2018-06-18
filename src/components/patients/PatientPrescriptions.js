import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, fetchPatient } from '../../fetches';
import { setUser } from '../../actions/user'
import { setAllPrescriptions } from  '../../actions/prescriptions'
import MedsContainer from './MedsContainer'
import PrescriptionForm from '../prescriptions/PrescriptionForm'
import PatientNavBar from '../PatientNavBar'
import Footer from '../Footer';

const DEFAULT_STATE = {
  // addRxClicked: false,
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
      // addRxClicked: false,
      clicked: true,
      whichClicked: event.target.name
    })
  }

  // handleClickAddRx = () => {
  //   this.setState({
  //     addRxClicked: !this.state.addRxClicked,
  //     clicked: false
  //   })
  // }

  render() {
    return (
      <div>
        Patient Prescriptions
        <PatientNavBar />
        <h1 className="meds-header">My Pillbox</h1>
        <br />
        <div className="teal massive ui basic buttons pillbox-buttons">
          <div className="pillbox-button">
            <button className="ui button pillbox" onClick={this.handleClick} name="mon">M</button>
          </div>
          <div className="pillbox-button">
            <button className="ui button pillbox" onClick={this.handleClick} name="tues">T</button>
          </div>
          <div className="pillbox-button">
            <button className="ui button pillbox" onClick={this.handleClick} name="wed">W</button>
          </div>
          <div className="pillbox-button">
            <button className="ui button pillbox" onClick={this.handleClick} name="thurs">Th</button>
          </div>
          <div className="pillbox-button">
            <button className="ui button pillbox" onClick={this.handleClick} name="fri">F</button>
          </div>
          <div className="pillbox-button">
            <button className="ui button pillbox" onClick={this.handleClick} name="sat">Sa</button>
          </div>
          <div className="pillbox-button">
            <button className="ui button pillbox" onClick={this.handleClick} name="sun">Su</button>
          </div>
        </div>

        { this.state.clicked ?
          <MedsContainer day={this.state.whichClicked} history={this.props.history} />
          :
          <div className="prompt">
            <br /><br /><br />
            <i className="huge long arrow alternate up icon"></i>
            <h2>Click on a day to see your medications</h2>
            <br /><br /><br /><br /><br /><br />
          </div>
        }

        <Footer />
        { /* this.state.addRxClicked && <PrescriptionForm patientId={this.props.user.userId} addPrescription={this.props.addPrescription} addDose={this.props.addDose} history={this.props.history} /> */ }
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
    setAllPrescriptions: setAllPrescriptions
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientPrescriptions);
