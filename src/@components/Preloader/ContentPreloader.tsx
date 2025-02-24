import Spinner from '@components/Loader/Spinner'

type ContentPreloaderProps = {
	loaderText?: string;
	show?: boolean;
};

const ContentPreloader = ({
	loaderText,
	show = true,
}: ContentPreloaderProps) => {
	if (!show) return;

	const styles = {
		borderRadius: "0.475rem",
		backgroundColor: "#fff",
		fontWeight: "700",
		margin: "0",
		width: "auto",
		padding: "1rem 2rem",
		top: "calc(50%)",
		left: "calc(50%)",
		transform: "translate(-50%, -50%)",
	};

	return (
		<div
			className="text-primary shadow-lg"
			style={{ ...styles, position: "absolute", textAlign: "center" }}
		>
			<Spinner text={loaderText ? loaderText : "Processing..."} />
		</div>
	);
};

export default ContentPreloader
