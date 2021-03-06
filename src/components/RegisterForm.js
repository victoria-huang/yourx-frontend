import React from 'react';

const RegisterForm = (props) => {
  return (
    <div>
      <div className="content-container">
        <img src={require('../assets/blur_bg.jpg')} alt='background' />
      </div>

      <div className="my-content auth">
        <h1 className="content-register">Register as:</h1>
        <button className="ui button huge" onClick={() => props.history.push("/patient-register")}>Patient</button>
        &nbsp; &nbsp;
        <button className="ui button huge" onClick={() => props.history.push("/provider-register")}>Provider</button>
        <br /><br />
        <div className="ui inverted divider"></div>
        <a className="back-link" onClick={() => props.history.push("/")}>
           &#8592; Back to Welcome
        </a>
      </div>
    </div>
  )
}

export default RegisterForm;
