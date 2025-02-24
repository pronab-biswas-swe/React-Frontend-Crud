import { FC, ReactNode } from "react";
import "./style.scss";
import Icon from "@components/Icon";
import { generateId } from "utility/random-generate";

type ISlideshowProps = {
	data: any[];
	id?: number | string;
	hasCaroselIndicator?: boolean;
	hasArrow?: boolean;
	children?: (item: any, idx: number) => ReactNode | ReactNode[];
};

const Slideshow: FC<ISlideshowProps> = ({
	id,
	data,
	children,
	hasCaroselIndicator,
	hasArrow = true,
}) => {
	const slideId = id || generateId();
	return (
		<div
			id={slideId as string}
			className="carousel slide"
			data-bs-ride="carousel"
		>
			<div className="carousel-inner">
				{data?.map((item, i) => (
					<div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
						{children(item, i)}
					</div>
				))}
			</div>
			{hasCaroselIndicator ? (
				<div className="carousel-indicators">
					{data?.map((_, i) => (
						<button
							type="button"
							key={i}
							data-bs-target={`#${slideId}`}
							data-bs-slide-to={i}
							className={i === 0 ? "active" : ""}
							aria-current={i === 0 ? "true" : "false"}
							aria-label={"Slide " + i + 1}
						/>
					))}
				</div>
			) : null}
			{hasArrow ? (
				<>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target={`#${slideId}`}
						data-bs-slide="prev"
					>
						<Icon icon="arrow_back_ios" size={70} />
						<span className="visually-hidden">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target={`#${slideId}`}
						data-bs-slide="next"
					>
						<Icon icon="arrow_forward_ios" size={70} />
						<span className="visually-hidden">Next</span>
					</button>
				</>
			) : null}
		</div>
	);
};

export default Slideshow;
