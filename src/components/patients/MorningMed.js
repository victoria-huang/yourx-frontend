import React from 'react'
import EditPrescription from '../prescriptions/EditPrescription'
import Popup from "reactjs-popup";

function getRandomNum() {
  return Math.floor((Math.random() * 4) + 1);
}

const MorningMed = (props) => {
  const times = props.times.map((t, idx) => {
    if (t.take_time.time_of_day === "morning") {
      return (
        <Popup key={idx} trigger={<img src={require(`../../assets/pill_${props.times[idx].rx_take_time.taken && props.day === "today" ? "check" : getRandomNum()}.png`)} height='40px' width='40px'/>} modal>
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="header">{props.med.brand_name}</div>
              <div className="content-modal">
                {" "}
                Take at {t.take_time.formatted_time}
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

export default MorningMed;
