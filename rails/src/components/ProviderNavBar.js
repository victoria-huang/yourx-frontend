import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/user';
import { withRouter } from 'react-router-dom'

class ProviderNavBar extends Component {
  handleLogout = () => {
    this.props.logout()
    this.props.history.push("/")
  }

  handleHome = () => {
    this.props.history.push('/provider-home')
  }

  render() {
    return (
      <div>
        <div className="ui teal inverted small borderless top fixed menu">
          <a onClick={this.handleHome} name="patient-home" className="item">
            <img src={require('../assets/pill_logo.png')} height='28px' width='28px' alt='pill logo' />
          </a>

          <div className="right menu">
            <div className="ui simple dropdown item">
              <i className="big user icon"></i><i className="dropdown icon"></i>
              <div className="menu">
                <a onClick={this.handleLogout} className="item">Logout</a>
              </div>
            </div>
          </div>
        </div>
        <div className="ui segment">
          <p></p>
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

export default withRouter(connect(null, mapDispatchToProps)(ProviderNavBar));
