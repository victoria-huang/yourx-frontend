import React, { Component } from 'react';
import { fetchPatientDailyMeds } from '../../fetches'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPrescriptions } from '../../actions/prescriptions'

class TodaysMedsContainer extends Component {
  componentDidMount() {
    const patient_id = localStorage.getItem("user_id")

    fetchPatientDailyMeds(patient_id)
    .then(console.log)
  }

  render() {
    return (
      <div>
        Todays Meds Container
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prescriptions: state.prescriptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setPrescriptions: setPrescriptions
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(TodaysMedsContainer);
