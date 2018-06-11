import React from 'react'

const MorningMed = (props) => {
  const times = props.times.map((t, idx) => {
    return <p key={idx}>Take at {t.take_time.formatted_time}</p>
  })
  return (
    <div>
      <h4>{props.med.brand_name}</h4>
      { times }
    </div>
  )
}

export default MorningMed;
