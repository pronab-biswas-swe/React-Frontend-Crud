import Login from "pages/landing/auth/Login";
import "./style.scss";

const Landing = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center animate__animated animate__fadeIn animate__slow login-page">
        <div className={`p-12 px-5`}>
          <div className="text-center pt-5 fs-1 fw-bold pb-10 text-success login-headlines">
            <p className="mb-0">Welcome</p>
            <p className="mb-0">BiswasTech Solutions</p>
            <p className="fs-4">"Empowering Teams, Simplifying Workflows!"</p>
          </div>
          <div
            className={`bg-gray-100 d-flex flex-center rounded-4 w-md-450px w-100 p-10 shadow login-card`}
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
