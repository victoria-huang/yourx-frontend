import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class MedListView extends Component {
  editPrescription = (id) => {
    this.props.history.push({
      pathname: '/edit-patient-prescription',
      state: {
        day: 'all',
        patientId: this.props.patientId,
        prescriptionId: id
      }
    })
  }

  render() {
    const cells = this.props.prescriptions.map((p, idx) => {
      const times = p.times.map((t, i) => {
        return <div key={i}>{t.take_time.day} at {t.take_time.formatted_time}</div>
      })

      return (
        <tr key={idx}>
          <td>{p.med.brand_name.toLowerCase()}</td>
          <td>{p.med.dosage}</td>
          <td>{p.med.sig}</td>
          <td>{times}</td>
          <td><button className="ui button" onClick={() => this.editPrescription(p.med.id)}>Edit</button></td>
        </tr>
      )
    })

    return (
      <div className="animated fadeIn">
        <div className="ui very padded container">
        <table className="ui basic table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Directions</th>
              <th>Times</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            { cells }
          </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default withRouter(MedListView);
