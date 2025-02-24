import Icon from "@components/Icon";
import { DATE_PATTERN } from "@constants/common.constant";
import { generateDateFormat } from "utility/splitDate";

type IProps = {
	date: any;
};

const DateBox = ({ date }: IProps) => (
	<div className="alert alert-dark border-light m-0 rounded-4 px-3 py-1">
		<div className="row mt-1 px-2">
			<div className="col-1 px-1">
				<Icon icon="calendar_month" size={18} color="dark" disabled />
			</div>
			<div className="col-11 px-n1">
				<b>
					{generateDateFormat(
						date,
						DATE_PATTERN.CASUAL + " | %hour% : %minute% %ampm%"
					)}
				</b>
			</div>
		</div>
	</div>
);

export default DateBox;