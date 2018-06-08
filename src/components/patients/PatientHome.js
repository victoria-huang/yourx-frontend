import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPrescription } from '../../actions/prescriptions'
import { setUser, logout } from '../../actions/user'
import { getUser } from '../../fetches'
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
    .then(user => {
      //fetch adherence here? maybe prescriptions here?
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
        <Adherence />
        <TodaysMedsContainer />
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
    setUser: setUser,
    logout: logout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome)
