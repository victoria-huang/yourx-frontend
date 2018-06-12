import React, { Component } from 'react'

const DEFAULT_STATE = {
  day: '',
  rx_time: ''
}

class EditTakeTimesForm extends Component {
  state = {
    ...DEFAULT_STATE
  }
  //
  // handleSubmitClick = (event) => {
  //   event.preventDefault()
  //   createTakeTime(this.state)
  //   .then(json => {
  //     this.props.handleAddTime(json)
  //   })
  // }
  //
  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  render() {
    return (
      <div>
        <form className="ui form">
          <div className="field">
            <label htmlFor="day">Day</label>
            <select name="day" value={this.state.day} onChange={this.handleChange}>
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
            <label htmlFor="rx_time">Time to Take</label>
            <input name="rx_time" type="time" placeholder='name' value={this.state.rx_time} onChange={this.handleChange} />
          </div>

          <button className="fluid ui large button" onClick={this.handleSubmitClick}>Add Time</button>
        </form>
      </div>
    )
  }
}

export default EditTakeTimesForm;
