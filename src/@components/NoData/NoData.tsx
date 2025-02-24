import React, { FC, useEffect, useState } from 'react';
import { toAbsoluteUrl } from 'utility/make-slug';

type NoDataProps = {
	details?: string;
	action?: any;
};

const NoData: FC<NoDataProps> = ({ details, action }) => {
	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => setShow(true), 500);
	}, []);

	if (!show) return <></>;

	return (
		<div className='d-flex flex-column align-items-center justify-content-center'>
			<div className='my-10'>
				<img
					src={toAbsoluteUrl('/media/svg/no-data.svg')}
					className='mw-100 mh-100px theme-light-show animate__animated animate__jackInTheBox'
					alt='no-data'
				/>
				<img
					src={toAbsoluteUrl('/media/svg/no-data.svg')}
					className='mw-100 mh-100px theme-dark-show animate__animated animate__jackInTheBox'
					alt='no-data'
				/>
			</div>

			<div className='fw-semibold fs-4 text-gray-500 animate__animated animate__fadeIn'>
				{details ? details : 'কোন তথ্য পাওয়া যায়নি!'}
			</div>

			{action ? <div className='mt-5'>{action}</div> : null}
		</div>
	);
};

export { NoData };
