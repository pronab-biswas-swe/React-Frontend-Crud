import { IObject } from '@interface/common.interface';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

type TableRowProps = {
	children?: JSX.Element | JSX.Element[];
	onClick?: () => void;
	className?: string;
	navigateTo?: string;
	head?: boolean;
	style?: IObject;
};

export const TableRow = ({ children, onClick, className, navigateTo, head, style }: TableRowProps) => {
	const navigate = useNavigate();

	const onRowClick = () => {
		onClick && onClick();
		navigateTo && navigate(navigateTo);
	};

	return (
		<tr
			className={clsx({
				'fw-bold text-gray-800': head,
				[className as string]: !!className,
			})}
			style={head ? { borderBottomWidth: 2, ...style } : { ...style }}
			onClick={onRowClick}
		>
			{children}
		</tr>
	);
};