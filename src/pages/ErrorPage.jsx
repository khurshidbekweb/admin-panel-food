import { useNavigate, useParams } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="content-center w-screen h-screen text-white text-center bg-[#7727f7]">
      <div className="mt-[-250px]">
        <h2 className="error text-[55px]">404</h2>
        <p>PAGE NOT FOUND</p>
        <p>It looks like nothing was found at this location.</p>
        <button
          className="mt-5 border p-2 bg-red-600"
          onClick={() => navigate(`/`)}
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
