import { BiSearch } from "react-icons/bi";
import logo from "../assets/image/login_logo.png";
import { useRef } from "react";
import { IMG_BASE_URL } from "../constants/server.BaseUrl";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ALL_DATA } from "../Query/ALL_DATA";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";

import { custumAxios } from "../configs/axios.config";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../redux/searchSlice";

const Navbar = (props) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchShow, setSearchShow] = useState(false);

  const getLanguage = ALL_DATA.useLanguage();

  const restaurant = props?.restaurant;

  // for change language
  if (!localStorage.getItem("language")) localStorage.setItem("language", "uz");

  const [languageChange, setLangaugeChange] = useState(
    localStorage.getItem("language")
  );

  const handleChangeLanguage = (e) => {
    localStorage.setItem("language", e.target.value);
    setLangaugeChange(e.target.value);
    queryClient.invalidateQueries({ type: "all" });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const inputValue = e.target.value.trim();
    try {
      const search = await custumAxios.get(
        `food/${restaurant?.id}/search?name=${inputValue}`,
        {
          headers: {
            "accept-language": localStorage.getItem("language"),
          },
        }
      );
      dispatch(setSearchValue(search?.data));
      if (inputValue) {
        navigate(`/${restaurant?.id}/search`);
      } else {
        navigate(`/${restaurant?.id}`);
        setSearchShow(false);
      }
      console.log(search);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar py-3">
      <div className="container px-3 relative mx-auto">
        <div className="navbar-wrap w-[100%] flex justify-between items-center">
          <Link to={`/${restaurant?.id}`} className="flex items-center gap-2">
            {restaurant?.image_url ? (
              <LazyLoadImage
                width={50}
                className="rounded-md"
                src={`${IMG_BASE_URL}${restaurant?.image_url}`}
                alt="restuarant Img"
                effect="blur"
                height={50}
              />
            ) : (
              <LazyLoadImage
                width={50}
                className="rounded-md"
                src={logo}
                effect="blur"
                height={50}
                alt="default restaurant img"
              />
            )}
            <h2>{restaurant?.name}</h2>
          </Link>

          <input
            className={`focus:border-blue-400 left-auto absolute p-3 ease-in duration-300 border rounded-lg block w-[55%] md:w-[70%] ${
              searchShow ? "translate-y-0" : "translate-y-[-80px]"
            }`}
            type="search"
            name="searchFood"
            placeholder="Search food"
            onChange={handleSearch}
          />

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchShow((prev) => !prev)}
              className={`text-gray-500 active:text-gray-800 ${
                location.pathname == `/${restaurant?.id}` ? "hidden" : "block"
              }`}
            >
              <BiSearch size={30} />
            </button>
            <select
              onChange={handleChangeLanguage}
              value={languageChange}
              className="border-2 py-[2px] px-2 rounded focus:outline-none focus:border-gray-500 text-gray-800 cursor-pointer"
            >
              {getLanguage?.data?.map((language) => (
                <option value={language.code} key={language._id}>
                  {language.code}
                </option>
              ))}
            </select>

            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
