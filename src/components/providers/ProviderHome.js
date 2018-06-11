import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/user'

class ProviderHome extends Component {
  handleLogout = () => {
    this.props.logout()
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <h1>
        Thank you for your interest in YouRx!
        <br />
        Provider functionality coming soon!
        </h1>
        
        <button onClick={this.handleLogout}>Logout</button>
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
