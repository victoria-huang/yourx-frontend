import React, { Component } from 'react';
import { getUser, fetchPatient } from '../../fetches';
import { Line } from 'react-chartjs-2';
import PatientNavBar from '../PatientNavBar';
import Footer from '../Footer';

export default class Adherences extends Component {
  state = {
    adherences: [],
    isLoaded: false
  }

  componentDidMount() {
    getUser()
    .then(user => {
      const patientId = user[0].user_id;

      fetchPatient(patientId)
      .then(patient => this.setState({
        adherences: patient.adherences,
        isLoaded: true
      }))
    })
  }

  getData = () => {
    const data = {
      labels: this.state.adherences.map(a => a.adh_date),
      datasets: [
        {
          label: 'Daily Adherence Percentage',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.adherences.map(a => a.percent)
        }
      ]
    };

    return data;
  }

  render() {
    return (
      <div>
        <PatientNavBar />

        <h1 className="meds-header">Adherence Tracker</h1>
        <p>How well are you taking your medications?</p>
        <div className="ui inverted divider"></div>

        <div className="ui very padded container">
          <div className={ this.state.isLoaded ? "ui disabled loader" : "ui active inverted dimmer" }>
            <div className="ui huge text loader">Loading</div>
          </div>
          { <Line data={this.getData()} /> }
        </div>

        <Footer />
      </div>
    )
  }
}
