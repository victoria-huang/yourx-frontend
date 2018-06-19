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

    window.scrollTo(0,0);
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
        <PatientNavBar />
        <h1 className="meds-header">My Pillbox</h1>
        <div className="ui inverted divider"></div>
        <div className="ui seven column centered grid container">
          <div className="computer only seven column centered row">
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="sun">Su</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="mon">M</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="tues">T</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="wed">W</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="thurs">Th</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="fri">F</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="sat">Sa</button>
            </div>
          </div>

          <div className="tablet only seven column centered row">
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="sun">Su</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="mon">M</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="tues">T</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="wed">W</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="thurs">Th</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="fri">F</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="sat">Sa</button>
            </div>
          </div>

          <div className="mobile only seven column centered row">
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="sun">S</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="mon">M</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="tues">T</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="wed">W</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="thurs">T</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="fri">F</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="sat">S</button>
            </div>
          </div>
        </div>
        <br />
        { this.state.clicked ?
          <MedsContainer day={this.state.whichClicked} history={this.props.history} />
          :
          <div className="prompt">
            <br /><br /><br />
            <i className="huge arrow up icon animated infinite bounce"></i>
            <br /><br /><br />
            <p className="click-day">Click on a day to see your medications</p>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
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
