import Spinner from '@components/Loader/Spinner';
import { IColors, IColorsLight, IObject, ISizes } from '@interface/common.interface';
import clsx from 'clsx';

type IButtonProps = {
	children: string | JSX.Element | JSX.Element[] | any;
	color?: IColors | IColorsLight;
	size?: ISizes;
	variant?: 'fill' | 'outline' | 'light' | 'active' | 'active-light';
	type?: 'submit' | 'button' | 'reset';
	isDisabled?: boolean;
	className?: string;
	onClick?: () => void;
	isLoading?: boolean;
	loadingText?: string;
	dropClose?: boolean;
	form?: string;
	style?: IObject;
	hoverTitle?: string;
};

const Button = ({
	children,
	color = 'primary',
	size = 'sm',
	variant,
	type = 'button',
	isDisabled,
	className,
	onClick,
	isLoading,
	loadingText,
	dropClose,
	form,
	style,
	hoverTitle,
}: IButtonProps) => {
	return (
		<button
			type={type}
			className={clsx(`d-flex align-items-center justify-content-center gap-1 btn btn-${size}`, {
				[`btn-${variant}-${color}`]: !!variant,
				[`btn-${color}`]: !variant,
				[className as string]: !!className,
			})}
			style={{ cursor: isLoading ? 'wait' : 'pointer', ...style }}
			disabled={isDisabled || isLoading}
			onClick={onClick}
			data-kt-menu-dismiss={dropClose ? 'true' : 'false'}
			form={form}
			title={hoverTitle}
		>
			{isLoading ? (
				<Spinner
					text={loadingText === undefined ? 'Processing ...' : loadingText}
					size='sm'
				/>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
