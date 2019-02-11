import React from 'react';

const Interaction = (props) => {
  const desc = props.description
  const med1 = props.interactionConcept[0].sourceConceptItem.name
  const med2 = props.interactionConcept[1].sourceConceptItem.name
  const severity = props.severity

  return (
    <div className="ui centered card">
      <div className="content">
        <div className="header">{ med1 } & { med2 }</div>
        <div className="meta">Severity: { severity === "N/A" ? "Unknown" : severity }</div>
        <div className="description">
          { desc }
        </div>
      </div>
      <div className="extra content">
        <div className="right floated author">
          <i className="ui exclamation triangle icon"></i>
        </div>
      </div>
    </div>
  )
}

export default Interaction;
