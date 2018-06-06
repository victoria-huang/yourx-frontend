import React, { Component } from 'react';
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';

const DEFAULT_STATE = {
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  dob: '',
  gender: '',
  street_one: '',
  street_two: '',
  city: '',
  user_state: '',
  zipcode: '',
  email: '',
  phone: '',
  errors: []
}

export default class PatientRegisterForm extends Component {
  state = {
    ...DEFAULT_STATE
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDateChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      dob: this.state.dob,
      gender: this.state.gender,
      street_one: this.state.street_one,
      street_two: this.state.street_two,
      city: this.state.city,
      state: this.state.user_state,
      zipcode: this.state.zipcode,
      email: this.state.email,
      phone: this.state.phone,
    }

    fetch(this.props.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        this.setState({
          errors: [json.errors]
        })
      } else {
        this.setState({
          ...DEFAULT_STATE
        })

        this.props.onSuccess(json, this.props.history);
      }
    });
  }


  render() {
    const errors = this.state.errors.map(error => { return <li>{error}</li> });

    return (
      <div>
        <h1>Patient Register</h1>

        <ul>
          { errors }
        </ul>

        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="first_name">First Name</label>
            <input name="first_name" type="text" value={this.state.first_name} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="last_name">Last Name</label>
            <input name="last_name" type="text" value={this.state.last_name} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="dob">Date of Birth</label>
            <DateInput name="dob" placeholder="Date of Birth" dateFormat="MM-DD-YYYY"	value={this.state.dob} iconPosition="left" onChange={this.handleDateChange} />
          </div>

          <div className="field">
            <label htmlFor="gender">Gender</label>
            <select name="gender" value={this.state.gender} onChange={this.handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to specify">Prefer not to specify</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="street_one">Street 1</label><br />
            <input name="street_one" type="text" value={this.state.street_one} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="street_two">Street 2</label><br />
            <input name="street_two" type="text" value={this.state.street_two} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="city">City</label><br />
            <input name="city" type="text" value={this.state.city} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="user_state">State</label>
            <select name="user_state" value={this.state.user_state} onChange={this.handleChange}>
              <option value="">Select</option>
              <option value="AL">Alabama</option>
            	<option value="AK">Alaska</option>
            	<option value="AZ">Arizona</option>
            	<option value="AR">Arkansas</option>
            	<option value="CA">California</option>
            	<option value="CO">Colorado</option>
            	<option value="CT">Connecticut</option>
            	<option value="DE">Delaware</option>
            	<option value="DC">District Of Columbia</option>
            	<option value="FL">Florida</option>
            	<option value="GA">Georgia</option>
            	<option value="HI">Hawaii</option>
            	<option value="ID">Idaho</option>
            	<option value="IL">Illinois</option>
            	<option value="IN">Indiana</option>
            	<option value="IA">Iowa</option>
            	<option value="KS">Kansas</option>
            	<option value="KY">Kentucky</option>
            	<option value="LA">Louisiana</option>
            	<option value="ME">Maine</option>
            	<option value="MD">Maryland</option>
            	<option value="MA">Massachusetts</option>
            	<option value="MI">Michigan</option>
            	<option value="MN">Minnesota</option>
            	<option value="MS">Mississippi</option>
            	<option value="MO">Missouri</option>
            	<option value="MT">Montana</option>
            	<option value="NE">Nebraska</option>
            	<option value="NV">Nevada</option>
            	<option value="NH">New Hampshire</option>
            	<option value="NJ">New Jersey</option>
            	<option value="NM">New Mexico</option>
            	<option value="NY">New York</option>
            	<option value="NC">North Carolina</option>
            	<option value="ND">North Dakota</option>
            	<option value="OH">Ohio</option>
            	<option value="OK">Oklahoma</option>
            	<option value="OR">Oregon</option>
            	<option value="PA">Pennsylvania</option>
            	<option value="RI">Rhode Island</option>
            	<option value="SC">South Carolina</option>
            	<option value="SD">South Dakota</option>
            	<option value="TN">Tennessee</option>
            	<option value="TX">Texas</option>
            	<option value="UT">Utah</option>
            	<option value="VT">Vermont</option>
            	<option value="VA">Virginia</option>
            	<option value="WA">Washington</option>
            	<option value="WV">West Virginia</option>
            	<option value="WI">Wisconsin</option>
            	<option value="WY">Wyoming</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="zipcode">Zipcode</label>
            <input name="zipcode" type="number" value={this.state.zipcode} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          </div>

          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input name="phone" type="tel" value={this.state.phone} onChange={this.handleChange} />
          </div>

          <button type="submit" className="ur button" role="button">Create Account</button>
        </form>
      </div>
    )
  }
}
