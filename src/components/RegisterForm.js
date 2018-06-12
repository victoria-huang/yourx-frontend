import React, { Component } from 'react';

class RegisterForm extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      let userClass = localStorage.getItem('userClass').toLowerCase()
      if (userClass === "doctor") {
        userClass = "provider"
      }
      this.props.history.push(`/${userClass}-home`)
    }
  }

  render() {
    return (
      <div>
        <div className="content-container">
          <img src={require('../assets/blur_bg.jpg')} alt='background' />
        </div>

        <div className="content auth">
          <h1 className="content-register">Register as:</h1>
          <button className="ui button huge" onClick={() => this.props.history.push("/patient-register")}>Patient</button>
          &nbsp; &nbsp;
          <button className="ui button huge" onClick={() => this.props.history.push("/provider-register")}>Provider</button>
          <br /><br />
          <div class="ui inverted divider"></div>
          <a className="back-link" onClick={() => this.props.history.push("/")}>
             &#8592; Back to Welcome
          </a>
        </div>
      </div>
    )
  }
}

export default RegisterForm;
