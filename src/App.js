import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome';
import PatientLoginForm from './components/patients/PatientLoginForm';
import PatientRegisterForm from './components/patients/PatientRegisterForm';
import PatientHome from './components/patients/PatientHome';

import withAuth from './components/withAuth';

const PatientHomeWithRouterAndAuth = withRouter(withAuth(PatientHome));

class App extends Component {
  patientAuthSuccess = (json, history) => {
    localStorage.setItem('username', json.username);
    localStorage.setItem('user_id', json.user_id);
    localStorage.setItem('user_class', json.user_class);
    localStorage.setItem('token', json.token);
    history.push("/patient-home")
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Welcome} />
          <Route path='/patient-login' render={ (props) => <PatientLoginForm url="http://localhost:3000/api/v1/patient_sessions" onSuccess={this.patientAuthSuccess} {...props} /> } />
          <Route path='/patient-register' render={ (props) => <PatientRegisterForm url="http://localhost:3000/api/v1/patients" onSuccess={this.patientAuthSuccess} {...props} /> } />
          <Route path='/patient-home' render={ (props) => <PatientHomeWithRouterAndAuth {...props} /> } />
        </div>
      </Router>
    );
  }
}

export default App;
