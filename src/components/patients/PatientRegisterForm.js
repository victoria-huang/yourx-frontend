import React, { Component } from 'react';

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
    const errors = this.state.errors.map(error => { return <li>{error}</li> })

    return (
      <div>
        <h1>Patient Register</h1>

        <ul>
          { errors }
        </ul>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label><br />
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <br />
          <label htmlFor="password">Password</label><br />
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <br />
          <label htmlFor="first_name">First Name</label><br />
          <input name="first_name" type="text" value={this.state.first_name} onChange={this.handleChange} />
          <br />
          <label htmlFor="last_name">Last Name</label><br />
          <input name="last_name" type="text" value={this.state.last_name} onChange={this.handleChange} />
          <br />
          <label htmlFor="dob">Date of Birth</label><br />
          <input name="dob" type="text" value={this.state.dob} onChange={this.handleChange} />
          <br />
          <label htmlFor="gender">Gender</label><br />
          <input name="gender" type="text" value={this.state.gender} onChange={this.handleChange} />
          <br />
          <label htmlFor="street_one">Street 1</label><br />
          <input name="street_one" type="text" value={this.state.street_one} onChange={this.handleChange} />
          <br />
          <label htmlFor="street_two">Street 2</label><br />
          <input name="street_two" type="text" value={this.state.street_two} onChange={this.handleChange} />
          <br />
          <label htmlFor="city">City</label><br />
          <input name="city" type="text" value={this.state.city} onChange={this.handleChange} />
          <br />
          <label htmlFor="user_state">State</label><br />
          <input name="user_state" type="text" value={this.state.user_state} onChange={this.handleChange} />
          <br />
          <label htmlFor="zipcode">Zipcode</label><br />
          <input name="zipcode" type="text" value={this.state.zipcode} onChange={this.handleChange} />
          <br />
          <label htmlFor="email">Email</label><br />
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          <br />
          <label htmlFor="phone">Phone</label><br />
          <input name="phone" type="text" value={this.state.phone} onChange={this.handleChange} />
          <br />

          <input type="submit" value="Create Account" />
        </form>
      </div>
    )
  }
}
