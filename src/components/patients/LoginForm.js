import React, { Component } from 'react';

const DEFAULT_STATE = {
  username: '',
  password: '',
  errors: []
}

export default class LoginForm extends Component {
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
        <div className="content-container">
          <img src={require('../../assets/blur_bg.jpg')} />
        </div>
        <div className="content auth">
          { this.props.type === "Patient" ?
            <i aria-hidden="true" className="pills huge icon"></i>
          :
            <i aria-hidden="true" className="user doctor huge icon"></i>
          }
          <h1 className="content-header">{this.props.type} Login</h1>

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

            <button type="submit" className="ui button" role="button">Login</button>
          </form>
          <div className="ui horizontal divider"> OR </div>
          <button className="ui button" role="button" onClick={() => this.props.history.push("/")}>Return to Welcome Page</button>

        </div>
      </div>
    )
  }
}
