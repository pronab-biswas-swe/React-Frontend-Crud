import {FC, ReactNode} from 'react'
import {Dropdown} from 'react-bootstrap'

type DropdownItemProps = {
  onClick?: () => void
  children?: ReactNode
}

const DropdownItem: FC<DropdownItemProps> = ({children, onClick}) => {
  return (
    <Dropdown.Item className='d-flex align-items-center p-3 item' onClick={onClick}>
      {children}
    </Dropdown.Item>
  )
}

export {DropdownItem}
