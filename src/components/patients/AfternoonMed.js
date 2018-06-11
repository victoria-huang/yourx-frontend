import React from 'react'

const AfternoonMed = (props) => {
  const times = props.times.map((t, idx) => {
    if (t.take_time.time_of_day === "afternoon") {
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

export default AfternoonMed;
