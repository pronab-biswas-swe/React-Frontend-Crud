import Icon from '@components/Icon';
import { FC, ReactNode } from 'react';
import { useParams } from 'react-router-dom';

type ContentBlockProps = {
	children: ReactNode;
	isBlock?: boolean;
	isRelease?: boolean;
	hasAction?: boolean;
	onActionButtonClick?: () => void;
	commentDescription?: string;
};

const ContentBlock: FC<ContentBlockProps> = ({
	children,
	isBlock,
	isRelease,
	hasAction,
	onActionButtonClick,
	commentDescription,
}) => {
	const { type: applicationType } = useParams();
	const isLogOrMy = applicationType?.includes('-log') || applicationType === "my";

	if (!isBlock && !isRelease) return <>{children}</>;

	if (isRelease && !isBlock)
		return <div style={{ background: !isLogOrMy ? 'var(--kt-success-light)' : '' }}>{children}</div>;

	return (
		<div className='bg-light-danger'>
			<div className='d-flex justify-content-between text-warning p-3'>
				<div>
					<h4 className='text-warning d-flex align-items-center'>
						<Icon
							icon='report_problem'
							className='me-2'
							size={20}
						/>
						এই অংশটি অগ্রহণযোগ্য বলে বিবেচিত হয়েছে!
						{hasAction && (
							<span
								className='ms-3 badge badge-dark text-light d-none d-sm-block'
								role='button'
								onClick={onActionButtonClick}
							>
								পূর্বাবস্থা
							</span>
						)}
					</h4>
					{!!commentDescription && (
						<span className='text-warning fs-5'>
							<b>মন্তব্য:</b> {commentDescription}
						</span>
					)}
					{hasAction && (
						<div className='d-flex d-sm-none align-items-center justify-content-center'>
							<span
								className='badge badge-dark text-light'
								role='button'
								onClick={onActionButtonClick}
							>
								পূর্বাবস্থা
							</span>
						</div>
					)}
				</div>
			</div>
			{children}
		</div>
	);
};

export default ContentBlock;
