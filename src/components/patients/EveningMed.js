import React from 'react'

const EveningMed = (props) => {
  const times = props.times.map((t, idx) => {
    if (t.take_time.time_of_day === "evening") {
      return <p key={idx}>Take at {t.take_time.formatted_time}</p>
    }
  })

  return (
    <div>
      <h4>{props.med.brand_name}</h4>
      { times }
    </div>
  )
}

export default EveningMed;
