import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import InternetImg from "./no-wifi.png";

const modalsRoot = document.getElementById("root-modals") || document.body;

const NoInternet = () => {
	const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

	// Checking internet connection
	useEffect(() => {
		let interval: any = null;

		const handleStatusChange = () => {
			if (!navigator.onLine) {
				interval = setInterval(() => setIsOnline(navigator.onLine), 2000);
			} else {
				setIsOnline(navigator.onLine);
				clearInterval(interval);
			}
		};

		window.addEventListener("online", handleStatusChange);
		window.addEventListener("offline", handleStatusChange);

		return () => {
			window.removeEventListener("online", handleStatusChange);
			window.removeEventListener("offline", handleStatusChange);
		};
	}, []);

	if (isOnline) return null;

	return ReactDOM.createPortal(
		<>
			<div
				role="dialog"
				aria-modal="true"
				className="fade modal show d-block"
				style={{ backdropFilter: "blur(4px)" }}
			>
				<div className="modal-dialog modal-dialog modal-dialog-centered">
					<div className="d-flex flex-column align-items-center justify-content-center w-100">
						<img
							src={InternetImg}
							className="animate__animated animate__headShake animate_slower animate__infinite"
							width={125}
						/>
						<h2 className="fs-2 text-danger animate__animated animate__zoomIn">
							No internet connection...!
						</h2>
					</div>
				</div>
			</div>
			<div className="fade modal-backdrop show"></div>
		</>,
		modalsRoot
	);
};
export { NoInternet };
