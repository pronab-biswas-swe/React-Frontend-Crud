import IconButton from '@components/IconButton';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

type IModalHeaderProps = {
	title: string | ReactNode | ReactNode[] | undefined;
	titleClass?: string;
	className?: string;
	handleClose: () => void;
	isMaximized?: boolean;
	onMaximize?: () => void;
};

const ModalHeader = ({
	title,
	titleClass,
	className,
	handleClose,
	isMaximized,
	onMaximize,
}: IModalHeaderProps) => {
	return (
		<div
			className={clsx(`modal-header bg-light py-2 px-3`, {
				[className as string]: !!className,
			})}
		>
			{typeof title === 'string' ? (
				<h3 className={clsx('m-0', { [titleClass as string]: !!titleClass })}>{title}</h3>
			) : (
				title
			)}
			{!title && <span></span>}
			<div className='d-flex gap-2'>
				{onMaximize && (
					<IconButton
						iconName={isMaximized ? 'fullscreen_exit' : 'fullscreen'}
						onClick={onMaximize}
						iconSize={15}
						className='d-none d-md-block'
						color='primary'
					/>
				)}
				<IconButton
					iconName='close'
					onClick={handleClose}
					color='danger'
					iconSize={15}
				/>
			</div>
		</div>
	);
};

export default ModalHeader;
