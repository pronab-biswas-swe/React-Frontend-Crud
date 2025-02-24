import React, { FC } from "react";
import { toAbsoluteUrl } from "utility/make-slug";

const AccessDenied: FC = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {/* <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">Oops!</h1> */}

      <div className="my-10">
        <img
          src={toAbsoluteUrl("/media/svg/no-data.svg")}
          className="mw-100 mh-100px theme-light-show animate__animated animate__jackInTheBox"
          alt="no-data"
        />
        <img
          src={toAbsoluteUrl("/media/svg/no-data.svg")}
          className="mw-100 mh-100px theme-dark-show animate__animated animate__jackInTheBox"
          alt="no-data"
        />
      </div>

      <div className="fw-semibold fs-4 text-gray-500 mb-7 animate__animated animate__fadeIn">
        এই পাইজে আপনার প্রবেশ নিষেধ !
      </div>
    </div>
  );
};

export { AccessDenied };
