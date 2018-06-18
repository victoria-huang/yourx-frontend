import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatientMed from './PatientMed';

const formatted = {
  'mon': "Monday's",
  'tues': "Tuesday's",
  'wed': "Wednesday's",
  'thurs': "Thursday's",
  'fri': "Friday's",
  'sat': "Saturday's",
  'sun': "Sunday's",
  'today': "Today's"
}

class MedsContainer extends Component {
  render() {
    const morningMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "morning").length > 0) {
        return <PatientMed key={idx} {...p} day={this.props.day} history={this.props.history} timeOfDay="morning" />
      }
    })

    const afternoonMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "afternoon").length > 0) {
        return <PatientMed key={idx} {...p} day={this.props.day} history={this.props.history} timeOfDay="afternoon" />
      }
    })

    const eveningMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "evening").length > 0) {
        return <PatientMed key={idx} {...p} day={this.props.day} history={this.props.history} timeOfDay="evening" />
      }
    })

    const nightMeds = this.props.prescriptions[`${this.props.day}`].map((p, idx) => {
      if (p.times && p.times.filter(t => t.take_time.time_of_day === "night").length > 0) {
        return <PatientMed key={idx} {...p} day={this.props.day} history={this.props.history} timeOfDay="night" />
      }
    })

    return (
      <div className="animated fadeIn">
        <div></div>
        <h1 className="meds-header">{formatted[this.props.day]} Meds</h1>
        <br />
        <div className="ui two column grid centered container">
          <div className="two column centered row">
            <div className="column">
              <h2><img src={require('../../assets/morning.png')} height='50px' width='50px' alt="morning" /> Morning</h2>
              <p>6 AM - 12 PM</p>
              <div className="ui inverted divider"></div>
              <div className="ui three column padded grid centered container">
                { morningMeds.findIndex(e => e !== undefined) > -1 ? morningMeds : "None" }
              </div>
              <br /><br /><br />
            </div>
            <div className="column">
              <h2><img src={require('../../assets/afternoon.png')} height='40px' width='40px' alt="afternoon" /> Afternoon</h2>
              <p>12 PM - 6 PM</p>
              <div className="ui inverted divider"></div>
              <div className="ui three column padded grid centered container">
                { afternoonMeds.findIndex(e => e !== undefined) > -1 ? afternoonMeds : "None" }
              </div>
              <br /><br /><br />
            </div>
          </div>
          <div className="two column centered row">
            <div className="column">
              <h2><img src={require('../../assets/evening.png')} height='50px' width='50px' alt="evening" /> Evening</h2>
              <p>6 PM - 12 AM</p>
              <div className="ui inverted divider"></div>
              <div className="ui three column padded grid centered container">
                { eveningMeds.findIndex(e => e !== undefined) > -1 ? eveningMeds : "None" }
              </div>
            </div>
            <div className="column">
              <h2><img src={require('../../assets/night.png')} height='45px' width='45px' alt="night" /> Night</h2>
              <p>12 AM - 6 AM</p>
              <div className="ui inverted divider"></div>
              <div className="ui three column padded grid centered container">
                { nightMeds.findIndex(e => e !== undefined) > -1 ? nightMeds : "None" }
              </div>
            </div>
          </div>
        </div>
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
