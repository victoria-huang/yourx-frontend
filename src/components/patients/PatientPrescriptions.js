import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, fetchPatient } from '../../fetches';
import { setUser } from '../../actions/user'
import { setAllPrescriptions } from  '../../actions/prescriptions'
import MedsContainer from './MedsContainer'
// import PrescriptionForm from '../prescriptions/PrescriptionForm'
import PatientNavBar from '../PatientNavBar'
import Footer from '../Footer';
import MedListView from './MedListView'

const DEFAULT_STATE = {
  clicked: false,
  whichClicked: '',
  listView: false
}

class PatientPrescriptions extends Component {
  state = {
    ...DEFAULT_STATE
  }

  componentDidMount() {
    getUser()
    .then(json => this.props.setUser({
      username: json[0].username,
      userId: json[0].user_id,
      userClass: json[0].user_class
    }))
    .then(() => {
      const patient_id = this.props.user.userId

      fetchPatient(patient_id)
      .then(json => {
        this.props.setAllPrescriptions(json.prescriptions);
      })
    })

    window.scrollTo(0,0);
  }

  handleClick = (event) => {
    this.setState({
      clicked: true,
      whichClicked: event.target.name,
      listView: false
    })
  }

  handleListView = () => {
    this.setState({
      ...DEFAULT_STATE,
      listView: true
    })
  }

  render() {
    return (
      <div>
        <PatientNavBar />
        <h1 className="meds-header">My Pillbox</h1>
        <br />
        <div className="ui centered grid container">
          <button className="ui basic large button" onClick={this.handleListView}>View as List</button>
        </div>
        <br />
        <div className="ui inverted divider"></div>
        <div className="ui seven column centered grid container">
          <div className="computer only seven column centered row">
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="sun">Su</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="mon">M</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="tues">T</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="wed">W</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="thurs">Th</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="fri">F</button>
            </div>
            <div className="column">
              <button className="ui teal massive button pillbox" onClick={this.handleClick} name="sat">Sa</button>
            </div>
          </div>

          <div className="tablet only seven column centered row">
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="sun">Su</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="mon">M</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="tues">T</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="wed">W</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="thurs">Th</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="fri">F</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="sat">Sa</button>
            </div>
          </div>

          <div className="mobile only seven column centered row">
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="sun">S</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="mon">M</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="tues">T</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="wed">W</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="thurs">T</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="fri">F</button>
            </div>
            <div className="column">
              <button className="ui teal small button pillbox" onClick={this.handleClick} name="sat">S</button>
            </div>
          </div>
        </div>
        <br />
        { this.state.clicked ?
          <MedsContainer day={this.state.whichClicked} history={this.props.history} />
          :
          this.state.listView ?
            <div>
              <MedListView prescriptions={this.props.prescriptions.all} patientId={this.props.user.userId} />
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
            :
            <div className="prompt">
              <br /><br /><br />
              <i className="huge arrow up icon animated infinite bounce"></i>
              <br /><br /><br />
              <p className="click-day">Click on a day to see your medications</p>
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        }
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    prescriptions: state.prescriptions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser,
    setAllPrescriptions: setAllPrescriptions
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientPrescriptions);
