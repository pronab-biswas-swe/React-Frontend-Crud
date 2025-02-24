import {ISizes} from '@interface/common.interface'
import React from 'react'

type SpinnerProps = {
  text?: string
  size?: ISizes
}

const Spinner = ({text, size = 'md'}: SpinnerProps) => {
  return (
    <span className='indicator-progress' style={{display: 'block'}}>
      {text}
      <span className={`spinner-border spinner-border-${size} align-middle ms-2`}></span>
    </span>
  )
}

export default Spinner
