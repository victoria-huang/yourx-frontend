import React, { Component } from 'react';
import { connect } from 'react-redux';
import MorningMed from './MorningMed';
import AfternoonMed from './AfternoonMed';
import EveningMed from './EveningMed';
import NightMed from './NightMed';

class MedsContainer extends Component {
  render() {
    const morningMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "morning").length > 0) {
        return <MorningMed key={idx} {...p} />
      }
    })

    const afternoonMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "afternoon").length > 0) {
        return <AfternoonMed key={idx} {...p} />
      }
    })

    const eveningMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "evening").length > 0) {
        return <EveningMed key={idx} {...p} />
      }
    })

    const nightMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "night").length > 0) {
        return <NightMed key={idx} {...p} />
      }
    })

    return (
      <div>
        <h1>Todays Meds Container</h1>
        <h3>Morning (6 AM - 12 PM)</h3>
        { morningMeds }
        <h3>Afternoon (12 PM - 6 PM)</h3>
        { afternoonMeds }
        <h3>Evening (6 PM - 12 AM)</h3>
        { eveningMeds }
        <h3>Night (12 AM - 6 AM)</h3>
        { nightMeds }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prescriptions: state.prescriptions
  }
}

export default connect(mapStateToProps)(MedsContainer);
