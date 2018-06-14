import React from 'react'
import EditPrescription from '../prescriptions/EditPrescription'
import Popup from "reactjs-popup";

function getRandomNum() {
  return Math.floor((Math.random() * 4) + 1);
}

const EveningMed = (props) => {
  const times = props.times.map((t, idx) => {
    if (t.take_time.time_of_day === "evening") {
      return (
        <Popup key={idx} trigger={<img src={require(`../../assets/pill_${getRandomNum()}.png`)} height='40px' width='40px'/>} modal>
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="header">{props.med.brand_name.toLowerCase()}</div>
              <div className="content-modal">
                {" "}
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
    <div>
      { times }
    </div>
  )
}

export default EveningMed;
