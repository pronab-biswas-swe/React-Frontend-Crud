import { Dropdown, DropdownItem } from "@components/Dropdown";
import Icon from "@components/Icon";
import { ReactNode } from "react";

type IDownloadMenuProps = {
	children?: ReactNode | ReactNode[] | string | number | any;
	fnDownloadExcel?: () => void;
	fnDownloadPDF?: () => void;
	className?: string;
};

export const DownloadMenu = ({
	children,
	fnDownloadExcel,
	fnDownloadPDF,
	className,
}: IDownloadMenuProps) => {
	return (
		<Dropdown
			btnIcon={true}
			btnColor="success"
			btnContent={<Icon icon="download" size={20} className={className} />}
		>
			{children ? (
				children
			) : (
				<>
					{!!fnDownloadPDF && (
						<DropdownItem onClick={fnDownloadPDF}>
							<Icon size={20} color="danger" icon="picture_as_pdf" />
							&nbsp;&nbsp;পিডিএফ
						</DropdownItem>
					)}
					{!!fnDownloadExcel && (
						<DropdownItem onClick={fnDownloadExcel}>
							<Icon size={20} color="success" icon="newspaper" />
							&nbsp;&nbsp;এক্সেল
						</DropdownItem>
					)}
				</>
			)}
		</Dropdown>
	);
};
