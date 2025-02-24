import { IColors } from '@interface/common.interface';
import { FC, ReactNode } from 'react';
import ReactDropdown from 'react-bootstrap/Dropdown';
import './dropdown.scss';
import clsx from 'clsx';

type IDropdown = {
	children: string | ReactNode | any;
	btnContent: ReactNode | string;
	btnColor?: IColors;
	btnIcon?: boolean;
	btnVariant?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'dark'
		| 'light'
		| 'link'
		| 'outline-primary'
		| 'outline-secondary'
		| 'outline-success'
		| 'outline-danger'
		| 'outline-warning'
		| 'outline-info'
		| 'outline-dark'
		| 'outline-light';
	id?: string;
	position?: 'static' | 'relative';
};

const Dropdown: FC<IDropdown> = ({
	children,
	btnContent,
	btnColor,
	btnIcon,
	id,
	position = 'static',
	btnVariant = 'outline-secondary',
}) => {
	return (
		<ReactDropdown style={{ position }}>
			<ReactDropdown.Toggle
				variant={btnVariant}
				size='sm'
				className={clsx(`btn btn-sm`, {
					'btn-icon': btnIcon,
					[`btn-${btnColor}`]: !!btnColor,
				})}
				id={id}
			>
				{btnContent}
			</ReactDropdown.Toggle>

			<ReactDropdown.Menu>
				<div className='menu-wrapper'>{children}</div>
			</ReactDropdown.Menu>
		</ReactDropdown>
	);
};

export { Dropdown };
