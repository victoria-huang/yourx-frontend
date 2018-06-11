import React, { Component } from 'react'
import TakeTimesForm from './TakeTimesForm'

const DEFAULT_STATE = {
  brand_name: '',
  addTimeFormClicked: true,
  times: [],
}

class PrescriptionForm extends Component {
  state = {
    ...DEFAULT_STATE
  }

  handleSubmit = (event) => {
    event.preventDefault()
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
    }, () => {console.log(this.state)})
  }

  render() {
    const takeTimes = this.state.times.map((t, idx) => {
      return <p key={idx}>{t.day} at {t.formatted_time}</p>
    })

    return (
      <div>
        <h1>Add Prescription</h1>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="brand_name">Medication Name</label>
            <input name="brand_name" type="text" placeholder='name' value={this.state.brand_name} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="times">Times to Take</label>
            { takeTimes }

            { this.state.addTimeFormClicked ?
              <TakeTimesForm handleAddTime={this.handleAddTime} />
              :
              <button onClick={this.handleAddTimeFormClick}>Add Another Time</button>
            }
          </div>

          <button type="submit" className="fluid ui large button">Submit</button>
        </form>
      </div>
    )
  }
}

export default PrescriptionForm;
