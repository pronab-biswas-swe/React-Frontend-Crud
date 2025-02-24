import Icon from '@components/Icon';
import MediaPreview from '@components/MediaPreview';
import Tag from '@components/Tag';
import Thumb from '@components/Thumb';
import { IColors } from '@interface/common.interface';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ITableCellProps = {
	children?: ReactNode | ReactNode[] | string | number;
	hasImg?: boolean;
	isActive?: boolean;
	imgSrc?: string;
	imagePreview?: boolean;
	text?: string | number | ReactNode;
	textClassName?: string;
	navigateTo?: string;
	subText?: string | ReactNode;
	textAlign?: 'center' | 'end' | 'start';
	head?: boolean;
	minWidth?: number;
	width?: number;
	tagText?: string | number;
	tagColor?: IColors;
	className?: string;
	onClick?: () => void;
	verticalAlign?: 'baseline' | 'top' | 'middle' | 'bottom' | 'text-bottom' | 'text-top';
	colSpan?: number;
	rowSpan?: number;
};

export const TableCell = ({
	children,
	hasImg = false,
	isActive,
	imgSrc,
	text,
	textClassName,
	navigateTo,
	subText,
	textAlign,
	head,
	minWidth,
	width,
	tagText,
	tagColor,
	className,
	onClick,
	verticalAlign,
	colSpan,
	rowSpan,
	imagePreview,
}: ITableCellProps) => {
	const TTag = ({ children }: { children: ReactNode }) =>
		head ? (
			<th
				className={clsx('fw-bold text-gray-700 border-bottom-2 border-secondary', {
					[`w-${width}px`]: !!width,
					[`min-w-${minWidth}px`]: !!minWidth,
					[`text-${textAlign}`]: textAlign,
					[`align-${verticalAlign}`]: !!verticalAlign,
					[className as string]: !!className,
				})}
				colSpan={colSpan}
				rowSpan={rowSpan}
			>
				{children}
			</th>
		) : (
			<td
				className={clsx('py-1', {
					[`text-${textAlign}`]: !!textAlign,
					[`align-${verticalAlign}`]: !!verticalAlign,
					'cursor-pointer': !!onClick,
					[className as string]: !!className,
				})}
				onClick={onClick ? onClick : undefined}
				colSpan={colSpan}
				rowSpan={rowSpan}
			>
				{children}
			</td>
		);

	return (
		<TTag>
			{children ? (
				children
			) : (
				<div
					className={clsx(`d-flex align-items-center gap-3`, {
						[`justify-content-${textAlign} text-${textAlign}`]: !!textAlign,
					})}
				>
					{hasImg && imagePreview ? (
						<div>
							<MediaPreview
								file={{ previewUrl: imgSrc || '', fileType: 'jpg' }}
								isExternal
							>
								<Thumb imgSrc={imgSrc} />
							</MediaPreview>
						</div>
					) : null}
					{hasImg && !imagePreview ? <Thumb imgSrc={imgSrc} /> : null}
					<div className='d-flex justify-content-start flex-column'>
						{navigateTo ? (
							<Link
								to={navigateTo}
								className={clsx('text-dark fw-bold text-hover-primary fs-6', {
									[textClassName as string]: !!textClassName,
								})}
							>
								{text}
							</Link>
						) : (
							<div
								className={clsx('text-dark fs-6', {
									[textClassName as string]: !!textClassName,
								})}
							>
								{text}
								<span className='float-end'>
									{isActive !== undefined && isActive !== null ? (
										isActive ? (
											<Icon
												icon='done'
												color='success'
												size={16}
											/>
										) : (
											<Icon
												icon='close'
												color='danger'
												size={16}
											/>
										)
									) : null}
									{tagText ? (
										<Tag
											title={tagText as string}
											className='ms-3 rounded-4 px-4'
											color={tagColor}
										/>
									) : null}
								</span>
							</div>
						)}
						{subText ? <div className='text-muted fw-semibold text-muted d-block fs-7'>{subText}</div> : null}
					</div>
				</div>
			)}
		</TTag>
	);
};
