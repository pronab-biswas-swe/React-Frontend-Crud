import { IColors } from '@interface/common.interface';
import React from 'react';
import { numEnToBn } from 'utility/translator';

interface IProgressBar {
	title?: string;
	percentage: number;
	showLabel?: boolean;
	color?: IColors;
	height?: number;
}

const ProgressBar = ({ title, percentage, showLabel, color = 'primary', height = 5 }: IProgressBar) => {
	percentage = percentage > 100 ? 100 : percentage;
	return (
		<div className='d-flex align-items-center w-100 flex-column my-3'>
			{showLabel && (
				<div className='d-flex justify-content-between w-100 mt-auto mb-2'>
					<span className='fw-bold fs-6 text-gray-500'>{title || ''}</span>
					<span className='fw-bolder fs-6'>{numEnToBn(percentage || 0)}%</span>
				</div>
			)}
			<div className={`h-${height}px mx-3 w-100 bg-light mb-3`}>
				<div
					className={`bg-${color} rounded h-${height}px`}
					role='progressbar'
					style={{ width: `${percentage || 0}%` }}
				/>
			</div>
		</div>
	);
};

export default ProgressBar;
