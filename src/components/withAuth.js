import React, { Component } from 'react';

const withAuth = (ComponentToWrap) => {
  return class extends Component {
    componentDidMount() {
      if (!localStorage.getItem('token')) {
        this.props.history.push('/')
      }
    }

    render() {
      return <ComponentToWrap {...this.props} />
    }
  }
}

export default withAuth;
