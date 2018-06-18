import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/user';
import { withRouter } from 'react-router-dom'

class PatientNavBar extends Component {
  handleLogout = () => {
    this.props.logout()
    this.props.history.push("/")
  }

  handleHome = () => {
    this.props.history.push("/patient-home")
  }

  handlePrescriptions = () => {
    this.props.history.push("/patient-prescriptions")
  }

  handleAddPrescription = () => {
    this.props.history.push("/add-patient-prescription")
  }

  handleInteractions = () => {
    this.props.history.push("/interactions")
  }

  handleAdherences = () => {
    this.props.history.push("/adherence-tracker")
  }

  render() {
    return (
      <div>
        <div className="ui teal inverted small borderless top fixed menu">
          <a onClick={this.handleHome} name="patient-home" className="item">
            <img src={require('../assets/pill_logo.png')} height='28px' width='28px' alt='pill logo' />
          </a>

          <a onClick={this.handlePrescriptions} name="patient-prescriptions" className="item">
            <i className="big medkit icon"></i>
          </a>

          <a onClick={this.handleInteractions} name="interactions" className="item">
            <i className="big exclamation triangle icon"></i>
          </a>

          <a onClick={this.handleAdherences} name="adherences" className="item">
            <i className="big chart line icon"></i>
          </a>

          <div className="right menu">
            <a onClick={this.handleAddPrescription} name="add-patient-prescription" className="item">
                <i className="big icons">
                  <i className="pills icon"></i>
                  <i className="top right corner add icon"></i>
                </i>
            </a>
            <div className="ui simple dropdown item">
              <i className="big user icon"></i><i className="dropdown icon"></i>
              <div className="menu">
                <a className="item">Profile</a>
                <a onClick={this.handleLogout} className="item">Logout</a>
              </div>
            </div>
          </div>
        </div>
        <div className="ui segment">
          <p></p>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout: logout
  }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(PatientNavBar));
