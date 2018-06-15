import React, { Component } from 'react';
import { getUser, fetchPatient, getInteractions } from '../../fetches';
import PatientNavBar from '../PatientNavBar';
import Interaction from './Interaction';
import Footer from '../Footer';

export default class InteractionsContainer extends Component {
  state = {
    interactions: [],
    isLoaded: false
  }

  componentDidMount() {
    getUser()
    .then(user => {
      const patientId = user[0].user_id;

      fetchPatient(patientId)
      .then(patient => {
        const rxcuis = patient.prescriptions.map(p => p.med.rxcui).filter(r => r);

        getInteractions(rxcuis).then(r => {
          const interactions = r.fullInteractionTypeGroup[0].fullInteractionType.map(i => i.interactionPair[0]);

          this.setState({
            interactions,
            isLoaded: true
          })
        })
      })
    })
  }

  render() {
    const showInteractions = this.state.interactions.map((interaction, idx) => {
      return <Interaction key={idx} {...interaction} />
    })

    return (
      <div>
        <PatientNavBar />

        <h1 className="meds-header">Interaction Checker</h1>
        <p>Do not rely on YouRx to make decisions regarding your medical care. Always consult your health care provider first.</p>
        <div className="ui inverted divider"></div>

        <div className="ui very padded container">
          <div className={ this.state.isLoaded ? "ui disabled loader" : "ui active inverted dimmer" }>
            <div className="ui huge text loader">Loading</div>
          </div>
          { showInteractions.length > 0 ?
            <div className="ui three doubling cards">
              { showInteractions }
            </div>
            :
            <p>{ this.state.isLoaded? "No interactions found." : null }</p>
          }
        </div>
        <Footer />
      </div>
    )
  }
}
