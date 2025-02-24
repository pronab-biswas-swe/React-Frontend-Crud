import { ReactNode, useState } from 'react';
import { TableCell } from './TableCell';
import clsx from 'clsx';
import { IMetaSort, IObject } from '@interface/common.interface';
import Icon from '@components/Icon';

export type ITableHeadColumn = {
	title?: string | number;
	renderItem?: Function;
	width?: number;
	minWidth?: number;
	align?: 'end' | 'center' | 'start';
	colSpan?: number;
	rowSpan?: number;
} & (
	| {
			sortable?: false;
	  }
	| {
			sortable: true;
			columnKey: string; // Required in case of sortable = true
	  }
);

type TableHeadProps = {
	columns?: ITableHeadColumn[];
	multiSort?: boolean;
	onSort?: ([{ order, field }]: Array<IMetaSort>) => void;
	children?: ReactNode | ReactNode[];
	verticalAlign?: 'baseline' | 'top' | 'middle' | 'bottom' | 'text-bottom' | 'text-top';
	headerRowClassName?: string;
	headerRowStyle?: IObject;
	className?: string;
};

export const TableHead = ({
	columns,
	multiSort,
	onSort,
	children,
	headerRowClassName,
	headerRowStyle,
	className,
	verticalAlign,
}: TableHeadProps) => {
	const [sortList, setSortList] = useState<Array<IMetaSort>>([]);

	const onColSort = (colKey: string) => {
		let sl = [...sortList];
		if (!multiSort) {
			const c = sortList.find((f) => f.field === colKey);
			sl = c ? [c] : [];
		}
		const idx = sl.findIndex((f) => f.field === colKey);
		if (idx >= 0) sl[idx].order = sl[idx].order === 'asc' ? 'desc' : 'asc';
		else sl.push({ order: 'asc', field: colKey });
		setSortList(sl);
		onSort && onSort(sl);
	};

	return (
		<thead
			className={clsx({
				[`align-${verticalAlign}`]: !!verticalAlign,
				[className as string]: !!className,
			})}
		>
			{!!columns?.length && (
				<tr
					className={clsx('fw-bold text-gray-800', { [headerRowClassName as string]: !!headerRowClassName })}
					style={{ borderBottomWidth: 2, ...headerRowStyle }}
				>
					{columns?.map((col, i) => {
						const order = col?.sortable && sortList.find((s) => s.field === col?.columnKey)?.order;
						return (
							<TableCell
								width={col?.width}
								minWidth={col?.minWidth}
								textAlign={col.align}
								head
								key={i}
								colSpan={col?.colSpan}
								rowSpan={col?.rowSpan}
							>
								<div
									className={clsx({
										'd-flex align-items-center gap-2': col?.sortable,
									})}
								>
									{col?.renderItem ? col.renderItem() : col?.title}
									{col?.sortable && (
										<Icon
											icon={
												order === undefined
													? 'swap_vert'
													: order === 'asc'
													? 'arrow_downward'
													: 'arrow_upward'
											}
											hoverTitle={`${col?.title} সর্ট`}
											className='text-hover-primary'
											onClick={() => onColSort(col?.columnKey as string)}
										/>
									)}
								</div>
							</TableCell>
						);
					})}
				</tr>
			)}
			<tr
				className={clsx('fw-bold text-gray-800', { [headerRowClassName as string]: !!headerRowClassName })}
				style={{ borderBottomWidth: 2, ...headerRowStyle }}
			>
				{children}
			</tr>
		</thead>
	);
};
