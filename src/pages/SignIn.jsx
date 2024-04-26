import Cleave from "cleave.js/react";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import logo from "../assets/image/login_logo.png";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { custumAxios } from "../configs/axios.config";
import toast from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState("password");

  // Show password function
  const handleshowPasswor = () => {
    return showPassword === "password"
      ? setShowPassword("test")
      : setShowPassword("password");
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const number = e.target.number.value.replaceAll(" ", "");

    const password = e.target.password.value.trim();

    try {
      const login = await custumAxios.post("auth/login", {
        phone: number,
        password: password,
      });

      if (login.status < 300) {
        toast.success("successfully log in");
        localStorage.setItem("id", login?.data?.restourant_id);
        setTimeout(() => {
          navigate(`/${login?.data?.restourant_id}`);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="sign-in text-white fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
      <div className="w-screen h-screen absolute top-0 left-0 backdrop-blur-[3px] px-4">
        <div className="sign-wrap rounded-sm mt-28 mx-auto min-w-[300px] md:w-[550px] border-[rgb(134,59,59)] shadow p-5 bg-[rgba(153,107,58,0.89)] bg-[linear-gradient(90deg, rgba(153,107,58,1) 0%, rgba(105,108,60,1) 47%, rgba(134,107,59,1) 71%)]">
          <div className="text-center">
            <LazyLoadImage
              className="p-0  h-[150px]"
              width={150}
              src={logo}
              height={140}
              alt="img"
              effect="blur"
            />
          </div>
          <form className="md:w-[70%] mx-auto" onSubmit={handleLogin}>
            <label>
              <span className="text-[20px] font-bold">Enter your number</span>
              <Cleave
                placeholder="Number"
                options={{
                  numeralPositiveOnly: true,
                  prefix: "+998",
                  delimiter: " ",
                  blocks: [4, 2, 3, 2, 2],
                }}
                name="number"
                required
                className="rounded p-2 w-[100%] mt-3 text-[#474d4d] font-bold text-[18px] bg-white"
              />
            </label>
            <label className="mt-3 block relative">
              <span className="text-[20px] font-bold">Enter your password</span>
              <input
                placeholder="********"
                type={showPassword}
                name="password"
                className="rounded p-2 w-[100%] mt-3 text-[#474d4d] font-medium text-[18px] bg-white"
                required
              />
              <span
                type="submit"
                onClick={handleshowPasswor}
                className="absolute cursor-pointer text-black right-5 top-[50px]"
              >
                {" "}
                {showPassword === "password" ? (
                  <BsEyeSlash size={23} />
                ) : (
                  <BsEye size={23} />
                )}{" "}
              </span>
            </label>
            <button
              type="submit"
              className="btn mt-3 w-[100%] bg-green-700 py-2 font-bold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
