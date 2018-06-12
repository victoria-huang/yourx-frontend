import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import PatientRegisterForm from './components/patients/PatientRegisterForm';
import ProviderRegisterForm from './components/providers/ProviderRegisterForm';
import RegisterForm from './components/RegisterForm'
import PatientHome from './components/patients/PatientHome';
import PatientPrescriptions from './components/patients/PatientPrescriptions';
import ProviderHome from './components/providers/ProviderHome';
import withAuth from './components/withAuth';
import withAuthSuccess from './components/withAuthSuccess'

const PatientHomeWithRouterAndAuth = withRouter(withAuth(PatientHome));
const PatientPrescriptionsWithRouterAndAuth = withRouter(withAuth(PatientPrescriptions));
const ProviderHomeWithRouterAndAuth = withRouter(withAuth(ProviderHome));

class App extends Component {
  authSuccess = (json, history) => {
    localStorage.setItem('token', json.token);
    localStorage.setItem('userClass', json.user_class)
    json.user_class === 'Patient' ? history.push("/patient-home") : history.push("/provider-home")
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Welcome} />
          <Route path='/patient-login' render={ (props) => <LoginForm url="http://localhost:3000/api/v1/patient_sessions" onSuccess={this.authSuccess} {...props} type='Patient' /> } />
          <Route path='/provider-login' render={ (props) => <LoginForm url="http://localhost:3000/api/v1/doctor_sessions" onSuccess={this.authSuccess} {...props} type='Provider' /> } />
          <Route path='/patient-register' render={ (props) => <PatientRegisterForm url="http://localhost:3000/api/v1/patients" onSuccess={this.authSuccess} {...props} /> } />
          <Route path='/provider-register' render={ (props) => <ProviderRegisterForm url="http://localhost:3000/api/v1/doctors" onSuccess={this.authSuccess} {...props} /> } />
          <Route path='/register-choice' render={ (props) => <RegisterForm {...props} /> } />
          <Route path='/patient-home' render={ (props) => <PatientHomeWithRouterAndAuth {...props} /> } />
          <Route path='/patient-prescriptions' render={ (props) => <PatientPrescriptionsWithRouterAndAuth {...props} /> } />
          <Route path='/provider-home' render={ (props) => <ProviderHomeWithRouterAndAuth {...props} /> } />
        </div>
      </Router>
    );
  }
}

export default App;
