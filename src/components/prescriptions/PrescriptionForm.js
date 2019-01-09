import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPrescription, addDose } from '../../actions/prescriptions';
import { setUser } from '../../actions/user';
import TakeTimesForm from './TakeTimesForm';
import { getUser, createPrescription, createPrescriptionTakeTime, getSearchDrugNames, getRxcui } from '../../fetches';
import PatientNavBar from '../PatientNavBar';
import Footer from '../Footer';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const DEFAULT_STATE = {
  brandName: '',
  rxcui: '',
  sig: '',
  dosage: '',
  addTimeFormClicked: true,
  times: [],
  errors: []
}

function getRandomNum() {
  return Math.floor((Math.random() * 4) + 1);
}

class PrescriptionForm extends Component {
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

    window.scrollTo(0,0);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.brandName && this.state.times.length > 0) {
      getRxcui(this.state.brandName)
      .then(json => this.setState({
        rxcui: json.idGroup.rxnormId[0]
      }, () => {
        const rxBody = {
          brand_name: this.state.brandName,
          rxcui: this.state.rxcui,
          sig: this.state.sig,
          dosage: this.state.dosage,
          image_url: `pill_${getRandomNum()}.png`,
          patient_id: this.props.user.userId
        }

        createPrescription(rxBody)
        .then(json => {
          if (json.errors) {
            this.setState({
              errors: json.errors
            })
          } else {
            this.onSuccess(json)
          }
        })
      }))
    } else if (!this.state.brandName){
      this.setState({
        errors: ["Medication name cannot be blank"]
      })
    } else if (this.state.times.length === 0) {
      this.setState({
        errors: ["Must have at least one time to take medication"]
      })
    }
  }

  onSuccess = (json) => {
    this.props.addPrescription(json)

    const prescriptionId = json.med.id

    const times = [];

    this.state.times.forEach(time => {
      const timeBody = {
        prescription_id: prescriptionId,
        take_time_id: time.id
      }

      createPrescriptionTakeTime(timeBody)
      .then((rxTakeTime, idx) => {
        const obj = {
          take_time: time,
          rx_take_time: rxTakeTime
        }
        times.push(obj);

        if (times.length === this.state.times.length) {
          this.props.addDose(times, prescriptionId, 'all');
        }
      })
      .then(() => {
        this.setState({
          ...DEFAULT_STATE
        });
        alert('Prescription Added!');
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddTimeFormClick = (event) => {
    this.setState({
      addTimeFormClicked: true
    })
  }

  handleAddTime = (time) => {
    this.setState({
      addTimeFormClicked: false,
      times: [...this.state.times, time]
    })
  }

  removeTime = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      times: this.state.times.filter(t => t.id !== id)
    })
  }

  handleSearch = (event) => {
    let value;

    if (!event) {
      value = ''
    } else {
      value = event.value
    }

    this.setState({
      brandName: value
    })
  }

  getOptions = (input) => {
    if (!input) {
			return Promise.resolve({ options: [] });
		}

    return getSearchDrugNames(input)
    .then(json => {
      const values = json.slice(0, 30).map(name => { return { value: name, label: name } })
      return { options: values }
    })
  }

  render() {
    const errors = this.state.errors.map((error, idx) => { return <li key={idx}>{error}</li> });

    const takeTimes = this.state.times.map((t, idx) => {
      return (
        <div key={idx}>
          <p className="med-time">
            {t.day} at {t.formatted_time}
            &nbsp;
            <button className="ui mini button" onClick={(e) => this.removeTime(e, t.id)}>X</button>
          </p>
        </div>
      )
    })

    return (
      <div>
        <PatientNavBar />

        <h1 className="meds-header">Add Prescription</h1>
        <div className="ui inverted divider"></div>
        <div className="ui very padded container">
          { this.state.errors.length > 0 ?
            <div className="ui error message">
              <ul className="list">
                { errors }
              </ul>
            </div>
          :
            null
          }
          <h4>Medication Name</h4>
          <Select.Async
            name="brandName"
            value={ { label: this.state.brandName, value: this.state.brandName } }
            onChange={this.handleSearch}
            loadOptions={this.getOptions}
          />
          <br />
          <form autoComplete="off" className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <label htmlFor="dosage"><h4>Dosage</h4></label>
              <input name="dosage" type="text" placeholder='Dosage e.g. 1 mg, 1 tablet...' value={this.state.dosage} onChange={this.handleChange} />
            </div>

            <div className="field">
              <label htmlFor="sig"><h4>Directions</h4></label>
              <textarea name="sig" type="text" placeholder='Directions' value={this.state.sig} onChange={this.handleChange} />
            </div>

            <h4>Times</h4>
            <div className="ui inverted divider"></div>
            { takeTimes }
            <br />
            { this.state.addTimeFormClicked ?
              <TakeTimesForm handleAddTime={this.handleAddTime} />
              :
              <button className="ui button" onClick={this.handleAddTimeFormClick}>Add Another Time</button>
            }
            <br /><br />
            <button type="submit" className="fluid ui large button">Submit</button>
          </form>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser,
    addPrescription: addPrescription,
    addDose: addDose
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionForm);
