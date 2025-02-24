import {FC, ReactNode} from 'react'

type IMenuWrapper = {
  children: ReactNode
  triggerContent: ReactNode
  position?: 'bottom-end' | 'bottom-center' | 'bottom-start'
  bodyClassName?: string
  triggerClassName?: string
  className?: string
}

const MenuWrapper: FC<IMenuWrapper> = ({
  children,
  triggerContent,
  position = 'bottom-end',
  bodyClassName,
  triggerClassName,
  className,
}) => {
  return (
    <div className={`${className || ''}`}>
      <div
        className={`${triggerClassName || ''}`}
        data-kt-menu-trigger='click'
        data-kt-menu-placement={position}
        data-kt-menu-attach='parent'
        data-kt-menu-flip='top-end'
      >
        {triggerContent}
      </div>
      <div
        className={`menu menu-sub menu-sub-dropdown w-250px w-md-300px ${bodyClassName || ''}`}
        data-kt-menu='true'
      >
        {children}
      </div>
    </div>
  )
}

export {MenuWrapper}
