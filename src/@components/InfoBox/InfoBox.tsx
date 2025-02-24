import Icon from '@components/Icon';
import { IColors, IObject } from '@interface/common.interface';
import clsx from 'clsx';
import { ReactNode } from 'react';

type IAlertProps = {
	title?: string;
	type?: IColors;
	className?: string;
	icon?: string | 'rules';
	iconSize?: number;
	iconPosition?: 'top' | 'center';
	children?: ReactNode | ReactNode[] | string | number;
};

const iconMapper: IObject = {
	info: 'tips_and_updates',
	danger: 'gpp_bad',
	primary: 'info',
	warning: 'warning',
	success: 'verified_user',
};

const InfoBox = ({
	title,
	children,
	type = 'primary',
	className,
	icon,
	iconSize = 18,
	iconPosition = 'top',
}: IAlertProps) => (
	<div className={clsx(`alert alert-${type} py-2`, { [className as string]: !!className })}>
		<div
			className={clsx('d-flex gap-2', {
				'align-items-start': iconPosition === 'top',
				'align-items-center': iconPosition === 'center',
			})}
		>
			<Icon
				icon={icon ? icon : type ? iconMapper[type] : 'info'}
				size={iconSize}
				color={type}
				className='animate__animated animate__heartBeat animate__slower animate__delay-5s animate__infinite'
			/>
			<div className='alert-text fw-bold'>{children || title}</div>
		</div>
	</div>
);

export default InfoBox;
