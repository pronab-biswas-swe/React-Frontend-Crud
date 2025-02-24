import clsx from 'clsx';
import './dot-loader.scss';
import { IObject } from '@interface/common.interface';

type DotLoaderProps = {
	show?: boolean;
	style?: IObject;
	className?: string;
};

const DotLoader = ({ show, className, style }: DotLoaderProps) => {
	if (!show) return <></>;
	
	return (
		<span
			className={clsx('dot-loader', className)}
			style={style}
		/>
	);
};

export default DotLoader;
