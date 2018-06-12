import React, { Component } from 'react';

const withAuthSuccess = (ComponentToWrap) => {
  return class extends Component {
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
      return <ComponentToWrap {...this.props} />
    }
  }
}

export default withAuthSuccess;
