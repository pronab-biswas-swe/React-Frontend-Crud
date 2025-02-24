import DotLoader from '@components/Loader/DotLoader';
import ContentPreloader from '@components/Preloader/ContentPreloader';
import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

type CardProps = {
	id?: string;
	className?: string;
	children: ReactNode | ReactNode[] | String;
	isLoading?: boolean;
	withBodyLoader?: boolean;
	bodyLoaderTitle?: string;
	onClick?: () => void;
};

const Card: FC<CardProps> = ({
	id,
	className,
	children,
	isLoading,
	withBodyLoader,
	bodyLoaderTitle,
	onClick,
}) => {
	return (
		<div
			id={id}
			className={clsx('card animate__animated animate__fadeIn', className, { 'min-h-200px': withBodyLoader })}
			onClick={onClick && onClick}
		>
			<DotLoader
				show={isLoading}
				className='position-absolute top-0 translate-middle-x'
				style={{ left: 'calc(50% - 100px)' }}
			/>
			{children}
			{withBodyLoader && (
				<ContentPreloader
					show={isLoading}
					loaderText={bodyLoaderTitle}
				/>
			)}
		</div>
	);
};

export default Card;
