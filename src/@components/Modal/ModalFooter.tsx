import React from 'react'

type ModalFooterProps = {
  children: JSX.Element | JSX.Element[] | string
  className?: string
}

const ModalFooter = ({children, className}: ModalFooterProps) => {
  return <div className={`modal-footer ${className || ""}`}>{children}</div>;
}

export default ModalFooter
