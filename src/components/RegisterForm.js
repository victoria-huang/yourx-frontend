import React from 'react';

const RegisterForm = (props) => {
  return(
    <div>
      <div className="content-container">
        <img src={require('../assets/blur_bg.jpg')} alt='background' />
      </div>

      <div className="content auth">
        <h1 className="content-register">Register as:</h1>

        <button className="ui button massive" onClick={() => props.history.push("/patient-register")}>Patient</button>
        <br /><br />
        <button className="ui button massive" onClick={() => props.history.push("/provider-register")}>Provider</button>
        <br />
        <div className="ui horizontal divider"> OR </div>
        <br />
        <button className="ui button" onClick={() => props.history.push("/")}>Return to Welcome Page</button>

      </div>
    </div>
  )
}

export default RegisterForm;
