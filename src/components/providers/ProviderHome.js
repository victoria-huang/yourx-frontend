import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/user'
import ProviderNavBar from '../ProviderNavBar'

class ProviderHome extends Component {
  handleLogout = () => {
    this.props.logout()
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <ProviderNavBar />

          <div className="patient-home-header">
            <div className="patient-home-background">
              <img src={require('../../assets/color_pills.jpg')} alt="background" />
            </div>

            <div className="patient-home row">
              <div className="header-column right-col">
                <h1>Thank you for your interest in YouRx. !</h1>
                <div className="ui inverted divider"></div>
                <h2>Provider functionality coming soon!</h2>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout: logout
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(ProviderHome);
