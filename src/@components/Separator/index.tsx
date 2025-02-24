import React, {FC} from 'react'

type SeparatorProps = {
  className?: string
}

const Separator: FC<SeparatorProps> = ({className}) => {
  return <div className={`separator my-6 ${className || ''}`} />
}

export default Separator
