import React, { Component } from 'react';
import { connect } from 'react-redux';
import MorningMed from './MorningMed';
import AfternoonMed from './AfternoonMed';
import EveningMed from './EveningMed';
import NightMed from './NightMed';

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
        <div></div>
        <h1 className="meds-header">{formatted[this.props.day]} Pillbox</h1>
        <br />
        <div className="ui two column grid centered container">
          <div className="two column centered row">
            <div className="column">
              <h2><img src={require('../../assets/morning.png')} height='50px' width='50px'/> Morning</h2>
              <p>6 AM - 12 PM</p>
              <div className="ui inverted divider"></div>
              <div className="ui three column padded grid centered container">
                { morningMeds.findIndex(e => e !== undefined) > -1 ? morningMeds : "None" }
              </div>
            </div>
            <div className="column">
              <h2><img src={require('../../assets/afternoon.png')} height='50px' width='50px'/> Afternoon</h2>
              <p>12 PM - 6 PM</p>
              <div className="ui inverted divider"></div>
              <div className="ui three column padded grid centered container">
                { afternoonMeds.findIndex(e => e !== undefined) > -1 ? afternoonMeds : "None" }
              </div>
            </div>
          </div>
          <div className="two column centered row">
            <div className="column">
              <h2><img src={require('../../assets/evening.png')} height='50px' width='50px'/> Evening</h2>
              <p>6 PM - 12 AM</p>
              <div className="ui inverted divider"></div>
              <div className="ui three column padded grid centered container">
                { eveningMeds.findIndex(e => e !== undefined) > -1 ? eveningMeds : "None" }
              </div>
            </div>
            <div className="column">
              <h2><img src={require('../../assets/night.png')} height='50px' width='50px'/> Night</h2>
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
