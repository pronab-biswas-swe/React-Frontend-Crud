import Icon from "@components/Icon";
import React, { FC } from "react";

type DraftInfoBoxProps = {
	comment: string;
	type?: "delete";
};

const infoType = {
	delete: "প্রোফাইল থেকে এই অংশটি মুছে ফেলার আবেদন করা হয়েছে!",
};

const DraftInfoBox: FC<DraftInfoBoxProps> = ({ comment, type }) => {
	return (
		<div className="my-3">
			<h4 className="text-danger d-flex align-items-center">
				<Icon icon="delete" className="me-2" size={20} />
				{infoType[type]}
			</h4>
			<span className="text-danger fs-5">
				<b>মন্তব্য:</b> {comment}
			</span>
		</div>
	);
};

export default DraftInfoBox;
