import React from 'react'
import EditPrescription from '../prescriptions/EditPrescription'
import Popup from "reactjs-popup";

const PatientMed = (props) => {
  const times = props.times.map((t, idx) => {
    if (t.take_time.time_of_day === props.timeOfDay) {
      return (
        <Popup key={idx} trigger={<div className="hover-img"><img src={require(`../../assets/${props.times[idx].rx_take_time.taken && props.day === "today" ? "pill_check.png" : props.med.image_url}`)} alt='pill' /></div>} modal>
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="header">{props.med.brand_name.toLowerCase()}</div>
              <div className="content-modal">
                {" "}
                <p>Dosage: {props.med.dosage ? props.med.dosage: "No dosage! Click edit to add."}</p>
                <p>Directions: {props.med.sig ? props.med.sig : "No directions! Click edit to add."}</p>
                <p>Take at {t.take_time.formatted_time}</p>
                <br /><br />
                { props.times[idx].rx_take_time.taken && props.day === "today" ? "Taken!" : null }
              </div>
              <div className="actions">
                <EditPrescription
                  rxTakeTimeId={props.times[idx].rx_take_time.id}
                  timesIdx={idx}
                  prescriptionId={props.med.id}
                  day={props.day}
                  history={props.history}
                  text={props.times[idx].rx_take_time.taken ? 'Untake' : 'Take'}
                />
              </div>
            </div>
          )}
        </Popup>
      )
    }
  })

  return (
    <div className="column">
      { times }
    </div>
  )
}

export default PatientMed;
