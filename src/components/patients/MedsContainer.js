import React, { Component } from 'react';
import { connect } from 'react-redux';
import MorningMed from './MorningMed';
import AfternoonMed from './AfternoonMed';
import EveningMed from './EveningMed';
import NightMed from './NightMed';

const formatted = {
  'mon': 'Monday',
  'tues': 'Tuesday',
  'wed': 'Wednesday',
  'thurs': 'Thursday',
  'fri': 'Friday',
  'sat': 'Saturday',
  'sun': 'Sunday',
  'today': "Today's"
}

class MedsContainer extends Component {
  // componentDidUpdate() {
  //     console.log('update')
  // }

  render() {
    const morningMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "morning").length > 0) {
        return <MorningMed key={idx} {...p} day={this.props.day} history={this.props.history} />
      }
    })

    const afternoonMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "afternoon").length > 0) {
        return <AfternoonMed key={idx} {...p} day={this.props.day} history={this.props.history} />
      }
    })

    const eveningMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "evening").length > 0) {
        return <EveningMed key={idx} {...p} day={this.props.day} history={this.props.history} />
      }
    })

    const nightMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "night").length > 0) {
        return <NightMed key={idx} {...p} day={this.props.day} history={this.props.history} />
      }
    })

    return (
      <div>
        <h1>{formatted[this.props.day]} Medications</h1>
        <h3>Morning (6 AM - 12 PM)</h3>
        { morningMeds.findIndex(e => e !== undefined) > -1 ? morningMeds : "None" }
        <h3>Afternoon (12 PM - 6 PM)</h3>
        { afternoonMeds.findIndex(e => e !== undefined) > -1 ? afternoonMeds : "None" }
        <h3>Evening (6 PM - 12 AM)</h3>
        { eveningMeds.findIndex(e => e !== undefined) > -1 ? eveningMeds : "None" }
        <h3>Night (12 AM - 6 AM)</h3>
        { nightMeds.findIndex(e => e !== undefined) > -1 ? nightMeds : "None" }
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
