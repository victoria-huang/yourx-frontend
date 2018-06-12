import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TakeTimesForm from './TakeTimesForm';
import { deletePrescriptionTakeTime, deletePrescriptionFetch, editPrescriptionFetch, createPrescriptionTakeTime } from '../../fetches';
import { editPrescription, deletePrescription, addDose } from '../../actions/prescriptions'

const DEFAULT_STATE = {
  brandName: '',
  addTimeFormClicked: false,
  times: [],
  prescriptionId: '',
  day: ''
}

class EditPrescriptionForm extends Component {
  state = {
    ...DEFAULT_STATE
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push('/patient-home');
    } else if (this.props.prescriptions[this.props.location.state.day].length === 0) {
      this.props.history.push('/patient-home');
    } else {
      const prescriptionId = this.props.location.state.prescriptionId;
      const day = this.props.location.state.day;
      const p = this.props.prescriptions.all.find(p => p.med.id === prescriptionId)
      const takeTimes = p.times.map((t, idx) => { return {...t.take_time, rxTakeTimeId: t.rx_take_time.id, timesIdx: idx} })

      this.setState({
        brandName: p.med.brand_name,
        times: takeTimes,
        prescriptionId: prescriptionId,
        day: day
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const rxBody = {
      brand_name: this.state.brandName,
      patient_id: this.props.location.state.patientId
    }

    const times = [];

    editPrescriptionFetch(this.state.prescriptionId, rxBody)
    .then(json => {
      this.props.editPrescription(json, this.state.day)

      this.state.times.forEach(time => {
        const timeBody = {
          prescription_id: this.state.prescriptionId,
          take_time_id: time.id
        }

        createPrescriptionTakeTime(timeBody)
        .then((rxTakeTime, idx) => {
          const obj = {
            take_time: time,
            rx_take_time: rxTakeTime
          }
          times.push(obj)

          if (times.length === this.state.times.length) {
            this.props.addDose(times, this.state.prescriptionId, this.state.day);
          }
        })
      })
    })
    .then(() => {
      alert('Prescription Edited!');
      this.props.history.push('/patient-home')
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

  handleAddTime = (time, takeTimeId) => {
    this.setState({
      addTimeFormClicked: false,
      times: [...this.state.times, time]
    })
  }

  removeTime = (e, id, rxTakeTimeId) => {
    e.preventDefault()
    e.stopPropagation();
    this.setState({
      times: this.state.times.filter(t => t.id !== id)
    })

    deletePrescriptionTakeTime(rxTakeTimeId);
  }

  handleDeletePrescription = () => {
    this.props.deletePrescription(this.state.prescriptionId, this.state.day);

    deletePrescriptionFetch(this.state.prescriptionId);

    alert('Prescription deleted!')
    this.props.history.push('/patient-home')
  }

  render() {
    const takeTimes = this.state.times.map((t, idx) => {
      return (
        <div key={idx}>
          <p>
            {t.day} at {t.formatted_time}
            &nbsp;
            <button onClick={(e) => this.removeTime(e, t.id, t.rxTakeTimeId)}>X</button>
          </p>
        </div>
      )
    })

    return (
      <div>
        <h1>Edit Prescription</h1>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="brandName">Medication Name</label>
            <input name="brandName" type="text" placeholder='name' value={this.state.brandName} onChange={this.handleChange} />
          </div>

          <h3>Add Times</h3>
          { takeTimes }

          { this.state.addTimeFormClicked ?
            <TakeTimesForm handleAddTime={this.handleAddTime} />
            :
            <button onClick={this.handleAddTimeFormClick}>Add Another Time</button>
          }
          <br /><br />
          <button type="submit" className="fluid ui large button">Submit</button>
        </form>
        <br /><br />
        <button onClick={this.handleDeletePrescription}>DELETE PRESCRIPTION</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prescriptions: state.prescriptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editPrescription: editPrescription,
    deletePrescription: deletePrescription,
    addDose: addDose
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPrescriptionForm);
