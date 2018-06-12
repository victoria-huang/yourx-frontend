import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TakeTimesForm from './TakeTimesForm';
import { deletePrescriptionTakeTime } from '../../fetches';
import { editPrescription, deletePrescription, deleteDose } from '../../actions/prescriptions'

const DEFAULT_STATE = {
  brandName: '',
  addTimeFormClicked: false,
  times: [],
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
      const p = this.props.prescriptions[`${day}`].find(p => p.med.id === prescriptionId)
      const takeTimes = p.times.map((t, idx) => { return {...t.take_time, rxTakeTimeId: t.rx_take_time.id, timesIdx: idx} })

      this.setState({
        brandName: p.med.brand_name,
        times: takeTimes
      })
    }
  }

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //
  //   const rxBody = {
  //     brand_name: this.state.brandName,
  //     patient_id: this.props.patientId
  //   }
  //
  //   createPrescription(rxBody)
  //   .then(json => {
  //     this.props.addPrescription(json)
  //
  //     const prescriptionId = json.med.id
  //
  //     this.state.times.forEach(time => {
  //       const timeBody = {
  //         prescription_id: prescriptionId,
  //         take_time_id: time.id
  //       }
  //
  //       createPrescriptionTakeTime(timeBody)
  //     })
  //   })
  //   .then(() => this.setState({
  //       ...DEFAULT_STATE
  //     })
  //   )
  // }
  //
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

  removeTime = (id, rxTakeTimeId, timesIdx) => {
    this.setState({
      times: this.state.times.filter(t => t.id !== id)
    })

    this.props.deleteDose(rxTakeTimeId, timesIdx, this.props.location.state.day);

    deletePrescriptionTakeTime(rxTakeTimeId);
  }

  handleDeletePrescription = (prescriptionId) => {

  }

  render() {
    const takeTimes = this.state.times.map((t, idx) => {
      return (
        <div key={idx}>
          <p>
            {t.day} at {t.formatted_time}
            &nbsp;
            <button onClick={() => this.removeTime(t.id, t.rxTakeTimeId, t.timesIdx)}>X</button>
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
  console.log(state.prescriptions)
  return {
    prescriptions: state.prescriptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editPrescription: editPrescription,
    deletePrescription: deletePrescription,
    deleteDose: deleteDose
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPrescriptionForm);
