import React, { Component } from 'react';

const withAuth = (ComponentToWrap) => {
  return class extends Component {
    componentDidMount() {
      if (!localStorage.getItem('token')) {
        this.props.history.push('/')
      }
    }

    render() {
      return (<div>{ localStorage.getItem('token') && <ComponentToWrap {...this.props} /> }</div>)
    }
  }
}

export default withAuth;
