import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { takeMed, untakeMed, fetchPatientAdherence } from '../../fetches'
import { takePrescription, untakePrescription } from '../../actions/prescriptions'
import { updateAdherence } from '../../actions/user'

class EditPrescription extends Component {
  handleClick = (event) => {
    if (event.target.name === 'takeMed') {
      if (this.props.text === 'Untake') {
        this.props.untakePrescription(this.props.rxTakeTimeId, this.props.timesIdx)
        untakeMed(this.props.rxTakeTimeId)
        .then(() => {
          fetchPatientAdherence(this.props.user.userId)
          .then(json => this.props.updateAdherence(json))
        })
      } else {
        this.props.takePrescription(this.props.rxTakeTimeId, this.props.timesIdx)
        takeMed(this.props.rxTakeTimeId)
        .then(() => {
          fetchPatientAdherence(this.props.user.userId)
          .then(json => this.props.updateAdherence(json))
        })
      }
    } else if (event.target.name === 'editMed') {
      this.props.history.push({
        pathname: '/edit-patient-prescription',
        state: {
          day: this.props.day,
          prescriptionId: this.props.prescriptionId
        }
      })
    }
  }

  render() {
    return (
      <div>
        {this.props.day === 'today' ?
          <button name="takeMed" onClick={this.handleClick}>{this.props.text}</button>
          :
          null
        }
        <button name="editMed" onClick={this.handleClick}>Edit</button>
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
    takePrescription: takePrescription,
    untakePrescription: untakePrescription,
    updateAdherence: updateAdherence
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPrescription)
