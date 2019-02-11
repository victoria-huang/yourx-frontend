import React from 'react';

const NotFound = (props) => {
  return (
    <div>
      <div className="content-container">
        <img src={require('../assets/blur_bg.jpg')} alt='background' />
      </div>

      <div className="my-content">
        <img src={require('../assets/sad_pill_red.png')} alt='sad pill' />
        <h1 className="content-404 animated fadeInDownBig">Page Not Found</h1>
        <div className="ui inverted divider"></div>
        <a className="back-link" onClick={() => props.history.push("/")}>
           &#8592; Back to YouRx
        </a>
      </div>
    </div>
  )
}

export default NotFound;
