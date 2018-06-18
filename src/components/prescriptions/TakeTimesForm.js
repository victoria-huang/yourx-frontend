import React, { Component } from 'react'
import { createTakeTime } from '../../fetches'

const DEFAULT_STATE = {
  day: '',
  rx_time: ''
}

class TakeTimesForm extends Component {
  state = {
    ...DEFAULT_STATE
  }

  handleSubmitClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    createTakeTime(this.state)
    .then(json => {
      this.props.handleAddTime(json)
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form className="ui form">
          <div className="fields">
            <div className="field">
              <label htmlFor="day"><h5>Day</h5></label>
              <select className="ui dropdown" name="day" value={this.state.day} onChange={this.handleChange}>
                <option value="">Select</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="rx_time"><h5>Time to Take</h5></label>
              <input name="rx_time" type="time" placeholder='name' value={this.state.rx_time} onChange={this.handleChange} />
            </div>
          </div>

          <button className="ui button" onClick={this.handleSubmitClick}>Add Time</button>
        </form>
      </div>
    )
  }
}

export default TakeTimesForm;
