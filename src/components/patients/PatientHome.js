import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDailyPrescriptions, setAllPrescriptions } from '../../actions/prescriptions';
import { setUser, setAdherence } from '../../actions/user';
import { getUser, fetchPatientAdherence, fetchPatientDailyMeds, fetchPatient } from '../../fetches';
import Adherence from './Adherence';
import MedsContainer from './MedsContainer';
import PatientNavBar from '../PatientNavBar';
import Footer from '../Footer';

function getDate() {
  const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday"
  }

  const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec"
  }

  const date = new Date();
  const day = days[date.getDay()]
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  return `${day}, ${months[mm]} ${dd}, ${yyyy}`
}

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
      .then(json => this.props.setDailyPrescriptions(json))

      fetchPatient(patient_id)
      .then(json => {
        this.props.setAllPrescriptions(json.prescriptions);
      })
    })

    window.scrollTo(0,0);
  }

  render() {
    return (
      <div>
        <PatientNavBar />

        <div className="patient-home-header">
          <div className="patient-home-background">
            <img src={require('../../assets/color_pills.jpg')} alt="background" />
          </div>

          <div className="patient-home row">
            <Adherence />
            <div className="header-column right-col">
              <h1>Hi {this.props.user.username}!</h1>
              <div className="ui inverted divider"></div>
              <h2>Today is {getDate()}</h2>
            </div>
          </div>
        </div>

        <MedsContainer day="today" history={this.props.history} />
        <Footer />
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
    setDailyPrescriptions: setDailyPrescriptions,
    setAllPrescriptions: setAllPrescriptions,
    setUser: setUser,
    setAdherence: setAdherence
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome)
