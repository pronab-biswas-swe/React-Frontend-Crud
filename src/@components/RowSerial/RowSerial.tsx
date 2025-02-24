import clsx from 'clsx';
import { ReactNode } from 'react';
import { numEnToBn } from 'utility/textMapping';

type IRowSerialProps = {
	rowIndex: number;
	className?: string;
	children?: ReactNode | ReactNode[];
};

export const RowSerial = ({ rowIndex, className, children }: IRowSerialProps) => (
	<div className='d-flex justify-content-between align-items-center my-2 bg-secondary px-3 py-1 rounded'>
		<b
			className={clsx(
				'bg-gray-100 text-muted w-30px h-30px rounded-circle d-flex align-items-center justify-content-center',
				{ [className as string]: !!className }
			)}
		>
			{numEnToBn(rowIndex + 1)}
		</b>
		{children}
	</div>
);
