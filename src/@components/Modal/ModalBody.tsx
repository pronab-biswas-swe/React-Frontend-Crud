import React from 'react'

type ModalBodyProps = {
  children: JSX.Element | JSX.Element[] | string
}

const ModalBody = ({children}: ModalBodyProps) => {
  return <div className='modal-body'>{children}</div>
}

export default ModalBody
