import React from 'react'

interface BackButtonInterface {
    handleBack: () => void
}

function BackButton( {handleBack}: BackButtonInterface ) {
  return (
    <div>
        <button onClick={handleBack} className="back-button">Back</button>
    </div>
  )
}

export default BackButton