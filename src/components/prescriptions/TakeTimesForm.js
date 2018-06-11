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

  handleSubmit = (event) => {
    event.preventDefault()
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
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="day">Day</label>
            <input name="day" type="text" placeholder='name' value={this.state.day} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="rx_time">Time to Take</label>
            <input name="rx_time" type="text" placeholder='name' value={this.state.rx_time} onChange={this.handleChange} />
          </div>

          <button type="submit" className="fluid ui large button">Add Time</button>
        </form>
      </div>
    )
  }
}

export default TakeTimesForm;
