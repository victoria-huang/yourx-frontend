import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatientMed from './PatientMed';

class TodaysMedsContainer extends Component {
  render() {
    const dailyMeds = this.props.prescriptions.map((p, idx) => {
      return <PatientMed key={idx} {...p} />
    })

    return (
      <div>
        <h1>Todays Meds Container</h1>
        { dailyMeds }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prescriptions: state.prescriptions
  }
}

export default connect(mapStateToProps)(TodaysMedsContainer);
