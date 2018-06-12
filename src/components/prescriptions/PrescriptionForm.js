import React, { Component } from 'react'
import TakeTimesForm from './TakeTimesForm'
import { createPrescription, createPrescriptionTakeTime } from '../../fetches'

const DEFAULT_STATE = {
  brandName: '',
  addTimeFormClicked: true,
  times: [],
}

class PrescriptionForm extends Component {
  state = {
    ...DEFAULT_STATE
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const rxBody = {
      brand_name: this.state.brandName,
      patient_id: this.props.patientId
    }

    const times = [];

    createPrescription(rxBody)
    .then(json => {
      this.props.addPrescription(json)

      const prescriptionId = json.med.id

      this.state.times.forEach(time => {
        const timeBody = {
          prescription_id: prescriptionId,
          take_time_id: time.id
        }

        createPrescriptionTakeTime(timeBody)
        .then((rxTakeTime, idx) => {
          const obj = {
            take_time: time,
            rx_take_time: rxTakeTime
          }
          times.push(obj)

          if (times.length === this.state.times.length) {
            this.props.addDose(times, prescriptionId, 'all');
          }
        })
      })
    })
    .then(() => {
      alert('Prescription Added!')
      this.props.history.push('/patient-home')
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddTimeFormClick = (event) => {
    this.setState({
      addTimeFormClicked: true
    })
  }

  handleAddTime = (time, takeTimeId) => {
    this.setState({
      addTimeFormClicked: false,
      times: [...this.state.times, time]
    })
  }

  removeTime = (id) => {
    this.setState({
      times: this.state.times.filter(t => t.id !== id)
    })
  }

  render() {
    const takeTimes = this.state.times.map((t, idx) => {
      return (
        <div key={idx}>
          <p>
            {t.day} at {t.formatted_time}
            &nbsp;
            <button onClick={() => this.removeTime(t.id)}>X</button>
          </p>
        </div>
      )
    })

    return (
      <div>
        <h1>Add Prescription</h1>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="brandName">Medication Name</label>
            <input name="brandName" type="text" placeholder='name' value={this.state.brandName} onChange={this.handleChange} />
          </div>

          <h3>Add Times</h3>
          { takeTimes }

          { this.state.addTimeFormClicked ?
            <TakeTimesForm handleAddTime={this.handleAddTime} />
            :
            <button onClick={this.handleAddTimeFormClick}>Add Another Time</button>
          }
          <br /><br />
          <button type="submit" className="fluid ui large button">Submit</button>
        </form>



      </div>
    )
  }
}

export default PrescriptionForm;
