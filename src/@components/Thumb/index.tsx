import { IColors } from '@interface/common.interface';
import clsx from 'clsx';
import { FC, memo } from 'react';

type IThumbProps = {
	label?: string;
	imgSrc?: string;
	size?: number;
	variant?: 'circle' | 'square';
	onErrorImage?: string;
	borderColor?: IColors;
	className?: string;
	imgClassName?: string;
	keepOriginalRatio?: boolean;
	onClick?: () => void;
};

const Thumb: FC<IThumbProps> = ({
	label,
	imgSrc,
	size = 50,
	variant = 'square',
	onErrorImage,
	borderColor = 'light',
	className,
	imgClassName,
	keepOriginalRatio,
	onClick,
}) => (
	<div
		className={clsx(
			`symbol symbol-${size}px`,
			{
				'symbol-circle': variant === 'circle',
				[`mh-${size}px mw-${size}px`]: keepOriginalRatio,
			},
			className
		)}
		onClick={onClick && onClick}
	>
		{imgSrc ? (
			<img
				src={imgSrc}
				alt={label}
				onError={(ev: any) => (ev.target.src = onErrorImage || '/media/icons/blank-image.png')}
				loading='lazy'
				className={clsx([
					'rounded',
					{
						[`border border-${borderColor}`]: borderColor,
						'rounded-circle': variant === 'circle',
						'w-100 h-100': keepOriginalRatio,
						[imgClassName as string]: imgClassName,
					},
				])}
				style={{ objectFit: 'cover', objectPosition: 'top' }}
			/>
		) : label ? (
			<div className={clsx(`symbol-label fs-3 bg-light-dark text-gray`, imgClassName)}>
				{label?.[0]?.toLocaleUpperCase()}
			</div>
		) : (
			<img
				src={'/media/icons/blank-image.png'}
				alt={label}
				loading='lazy'
				className={clsx([
					'rounded',
					{
						[`border border-${borderColor}`]: borderColor,
						[imgClassName as string]: imgClassName,
					},
				])}
				style={{ objectFit: 'cover', objectPosition: 'top' }}
			/>
		)}
	</div>
);

export default memo(Thumb);
