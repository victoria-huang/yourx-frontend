import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import PatientRegisterForm from './components/patients/PatientRegisterForm';
import ProviderRegisterForm from './components/providers/ProviderRegisterForm';
import RegisterForm from './components/RegisterForm'
import PatientHome from './components/patients/PatientHome';
import PatientPrescriptions from './components/patients/PatientPrescriptions';
import ProviderHome from './components/providers/ProviderHome';
import EditPrescriptionForm from './components/prescriptions/EditPrescriptionForm'
import PrescriptionForm from './components/prescriptions/PrescriptionForm'
import withAuth from './components/withAuth';
import withAuthSuccess from './components/withAuthSuccess'
import NotFound from './components/NotFound'

const PatientHomeWithRouterAndAuth = withRouter(withAuth(PatientHome));
const PatientPrescriptionsWithRouterAndAuth = withRouter(withAuth(PatientPrescriptions));
const ProviderHomeWithRouterAndAuth = withRouter(withAuth(ProviderHome));
const LoginFormWithRouterAndAuthSuccess = withRouter(withAuthSuccess(LoginForm))
const PatientRegisterFormWithRouterAndAuthSuccess = withRouter(withAuthSuccess(PatientRegisterForm))
const ProviderRegisterFormWithRouterAndAuthSuccess = withRouter(withAuthSuccess(ProviderRegisterForm))
const RegisterFormWithRouterAndAuthSuccess = withRouter(withAuthSuccess(RegisterForm))
const WelcomeWithRouterAndAuthSuccess = withRouter(withAuthSuccess(Welcome))
const EditPrescriptionFormWithRouterAndAuth = withRouter(withAuth(EditPrescriptionForm));
const PrescriptionFormWithRouterAndAuth = withRouter(withAuth(PrescriptionForm));

class App extends Component {
  authSuccess = (json, history) => {
    localStorage.setItem('token', json.token);
    localStorage.setItem('userClass', json.user_class)
    json.user_class === 'Patient' ? history.push("/patient-home") : history.push("/provider-home")
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={WelcomeWithRouterAndAuthSuccess} />
          <Route path='/patient-login' render={ (props) => <LoginFormWithRouterAndAuthSuccess url="http://localhost:3000/api/v1/patient_sessions" onSuccess={this.authSuccess} {...props} type='Patient' /> } />
          <Route path='/provider-login' render={ (props) => <LoginFormWithRouterAndAuthSuccess url="http://localhost:3000/api/v1/doctor_sessions" onSuccess={this.authSuccess} {...props} type='Provider' /> } />
          <Route path='/patient-register' render={ (props) => <PatientRegisterFormWithRouterAndAuthSuccess url="http://localhost:3000/api/v1/patients" onSuccess={this.authSuccess} {...props} /> } />
          <Route path='/provider-register' render={ (props) => <ProviderRegisterFormWithRouterAndAuthSuccess url="http://localhost:3000/api/v1/doctors" onSuccess={this.authSuccess} {...props} /> } />
          <Route path='/register-choice' render={ (props) => <RegisterFormWithRouterAndAuthSuccess {...props} /> } />
          <Route path='/patient-home' render={ (props) => <PatientHomeWithRouterAndAuth {...props} /> } />
          <Route path='/patient-prescriptions' render={ (props) => <PatientPrescriptionsWithRouterAndAuth {...props} /> } />
          <Route path='/edit-patient-prescription' render={ (props) => <EditPrescriptionFormWithRouterAndAuth {...props} /> } />
          <Route path='/add-patient-prescription' render={ (props) => <PrescriptionFormWithRouterAndAuth {...props} /> } />
          <Route path='/provider-home' render={ (props) => <ProviderHomeWithRouterAndAuth {...props} /> } />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
