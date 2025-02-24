import React from 'react';
import clsx from 'clsx';
import { IColors } from '@interface/common.interface';

interface Props {
	type?: 'block' | 'circle' | 'text' | 'button';
	width?: string | number;
	height?: string | number;
	className?: string;
	animation?: 'wave' | 'glow';
	style?: React.CSSProperties;
	color?: IColors;
	isLoading?: boolean;
}

const Skeleton: React.FC<Props> = ({
	type,
	width = '100%',
	height = '100%',
	className,
	animation = 'glow',
	style,
	color = 'secondary',
	isLoading = true,
}) => {
	if (!isLoading) return;

	const classes = clsx('placeholder rounded', {
		'placeholder-glow': animation === 'glow',
		'placeholder-wave': animation === 'wave',
		[`bg-${color}`]: color,
		[className as string]: !!className,
	});

	switch (type) {
		case 'circle':
			return (
				<div
					style={{ width, height, borderRadius: '50%', ...style }}
					className={classes}
				/>
			);
		case 'text':
			return (
				<p className={animation}>
					<span className={classes} />
				</p>
			);
		case 'button':
			return (
				<button
					style={{ width, height, ...style }}
					className={clsx('btn', classes)}
					disabled
				/>
			);
		default:
			return (
				<div
					className={classes}
					style={{ width, height, ...style }}
				>
					<span className='w-100 h-100'/>
				</div>
			);
	}
};

export default Skeleton;
