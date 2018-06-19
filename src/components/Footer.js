import React from 'react';
import { withRouter } from 'react-router-dom'

const Footer = (props) => {
  return (
    <div>
      <div className="footer">
        <div className="ui stackable padded grid centered">
          <div className="four wide column">
            <h1 className="footer-logo">Y o u R x</h1>
            <div className="footer-slogan">Embrace your health.</div>
            <br />
            My primary goal as a pharmacist is to help my patients stay healthy and happy.
            This is your virtual pillbox, designed to allow you to easily take control of your health.
            <br /><br />
            <div className="footer-sig">&hearts; Victoria Huang, Pharm.D.</div>
          </div>
          <div className="one wide column"></div>
          <div className="three wide column footer-links">
            <div className="footer-header">Links</div>
            <div className="ui inverted divider"></div>

            <a className="hover-link" onClick={() => props.history.push('/patient-home')}>Home</a>
            <br /><br />
            <a className="hover-link" onClick={() => props.history.push('/patient-prescriptions')}>Pillbox</a>
            <br /><br />
            <a className="hover-link" onClick={() => props.history.push('/interactions')}>Interaction Checker</a>
            <br /><br />
            <a className="hover-link" onClick={() => props.history.push('/adherence-tracker')}>Adherence Tracker</a>
            <br /><br />
          </div>
          <div className="one wide column"></div>
          <div className="seven wide column footer-contact">
            <div className="footer-header">Contact</div>
            <div className="ui inverted divider"></div>
            <i className="ui large building icon"></i>
            3200 Pharmacy Drive, Medsway, NY 12345
            <br /><br />
            <i className="ui large phone icon"></i>
            +1 732 668 9197
            <br /><br />
            <i className="ui large envelope outline icon"></i>
            <a className="hover-link" href="mailto:vctrah@gmail.com">vctrah@gmail.com</a>
            <br /><br />

            <a href="https://github.com/victoria-huang" target="_blank"><i className="large circular github link icon"></i></a>&nbsp;&nbsp;
            <a href="https://www.linkedin.com/in/victoriah92/" target="_blank"><i className="large circular linkedin link icon"></i></a>&nbsp;&nbsp;
            <a href="https://medium.com/@victoria.huang" target="_blank"><i className="large circular medium link icon"></i></a>&nbsp;&nbsp;
            <a href="http://facebook.com" target="_blank"><i className="large circular facebook link icon"></i></a>&nbsp;&nbsp;
            <a href="http://twitter.com" target="_blank"><i className="large circular twitter link icon"></i></a>&nbsp;&nbsp;
            <a href="https://www.victoriahuang.me" target="_blank"><i className="large circular user circle link icon"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-end">
        Copyright &copy; {(new Date().getFullYear())} YouRx. All rights reserved.
      </div>
    </div>
  )
}

export default withRouter(Footer);
