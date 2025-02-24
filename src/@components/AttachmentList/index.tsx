import { Dropdown } from "@components/Dropdown";
import Icon from "@components/Icon";
import { IColors } from "@interface/common.interface";

type IAttachmentListProps = {
	children?: JSX.Element | JSX.Element[] | string | number | any;
	btnColor?: IColors;
};

export const AttachmentList = ({
	children,
	btnColor = "info",
}: IAttachmentListProps) => {
	return (
		<Dropdown
			btnContent={<Icon icon="description" color={btnColor} size={20} />}
			btnIcon
		>
			{children}
		</Dropdown>
	);
};
