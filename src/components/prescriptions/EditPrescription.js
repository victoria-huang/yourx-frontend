import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editPrescription, takePrescription, untakePrescription } from '../../actions/prescriptions'

class EditPrescription extends Component {
  handleClick = (event) => {
    if (event.target.name === 'takeMed') {
      this.props.text === 'Untake' ?
        this.props.untakePrescription(this.props.rxTakeTimeId)
      :
        this.props.takePrescription(this.props.rxTakeTimeId)
    } else if (event.target.name === 'editMed') {
      this.props.editPrescription(this.props.prescriptionId)
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
        <button name="editMed" onClick={this.handleClick}>Edit Med</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    takePrescription: takePrescription,
    editPrescription: editPrescription,
    untakePrescription: untakePrescription
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(EditPrescription)
