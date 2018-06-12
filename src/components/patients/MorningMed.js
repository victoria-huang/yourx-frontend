import React from 'react'
import EditPrescription from '../prescriptions/EditPrescription'

const MorningMed = (props) => {
  const times = props.times.map((t, idx) => {
    if (t.take_time.time_of_day === "morning") {
      return (
        <div key={idx}>
          <p>Take at {t.take_time.formatted_time}</p>
          { props.times[idx].rx_take_time.taken && props.day === "today" ? "Taken" : null }
          <EditPrescription
            rxTakeTimeId={props.times[idx].rx_take_time.id}
            timesIdx={idx}
            prescriptionId={props.med.id}
            day={props.day}
            history={props.history}
            text={props.times[idx].rx_take_time.taken ? 'Untake' : 'Take'}
          />
          <br />
        </div>
      )
    }
  })

  return (
    <div>
      <h4>{props.med.brand_name}</h4>
      { times }
    </div>
  )
}

export default MorningMed;
