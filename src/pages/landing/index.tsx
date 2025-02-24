import Login from "pages/landing/auth/Login";
import "./style.scss";

const Landing = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center animate__animated animate__fadeIn animate__slow home-height">
        <div className={`p-12 px-5`}>
          <div
            className={`bg-body d-flex flex-center rounded-4 w-md-350px w-100 p-10 shadow-sm`}
            style={{ height: "fit-content" }}
          >
            <div className="w-md-350px">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
