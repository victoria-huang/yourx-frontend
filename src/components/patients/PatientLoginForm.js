import React, { Component } from 'react';

const DEFAULT_STATE = {
  username: '',
  password: '',
  errors: []
}

export default class PatientLoginForm extends Component {
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
      password: this.state.password
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
        <h1>Patient Login</h1>

        <ul>
          { errors }
        </ul>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label><br />
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <br />
          <label htmlFor="password">Password</label><br />
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}
