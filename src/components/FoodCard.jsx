import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import "./swiper.css";
import { IMG_BASE_URL } from "../constants/server.BaseUrl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FoodUtils } from "../utils/food.utils";
import { QUERY_KEY } from "../Query/QUERY_KEY";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EditFood from "../Modals/EditFood";
import DeleteFood from "./DeleteFood";
import toast from "react-hot-toast";
import EditImage from "../Modals/EditImage";
import { FoodStatus } from "../configs/language";

const FoodCard = (props) => {
  const queryClient = useQueryClient();
  const language = localStorage.getItem("language")
  const deletaFood = useMutation({
    mutationFn: FoodUtils.deleteFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.category]});
      toast.success("Delete success");
    },
    onError: (err) => {
      console.log(err, "Delete food");
      toast.error("Error");
    },
  });

  const foodInformation = props?.food;

  return (
    <div className="card-food relative w-[47%] md:w-[31%] mb-2">
      <div className="images-wrap relative">
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {foodInformation.image_urls.length ? (
              foodInformation.image_urls.map((img, index) => {
                return (
                  <SwiperSlide
                    key={Math.random()}
                    className="h-[150px] sm:h-[200px] md:h-[300px] w-full"
                  >
                    <LazyLoadImage
                      src={`${IMG_BASE_URL}${img}`}
                      alt={`slider img ${index + 1}`}
                      className="h-full w-full rounded-t-[10px] py-2 bg-cover"
                      height={300}
                      effect="blur"
                    />
                  </SwiperSlide>
                );
              })
            ) : (
              <div className="h-[100px] text-center">no image</div>
            )}
          </Swiper>
          <EditImage data={foodInformation}/>
      </div>
      <EditFood data={foodInformation}/>
      <DeleteFood deleteFn={deletaFood.mutate} id={foodInformation._id}/>

      <h2 className="font-bold px-1 text-[16px] truncate">
        {foodInformation.name}
      </h2>
      <p className="overflow-hidden text-[13px] px-1">{foodInformation.description}</p>
      <p className="mb-1 px-1 text-[13px]">{foodInformation.price} {FoodStatus[3][language]}</p>
      <span
        className={`p-[4px] block w-full text-center rounded ${
          foodInformation?.food_status === "available"
            ? "text-white bg-green-500"
            : foodInformation?.food_status === "preparing"
            ? "bg-yellow-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {foodInformation?.food_status === "available"
            ? FoodStatus[0][language]
            : foodInformation?.food_status === "preparing"
            ? FoodStatus[1][language]
            : FoodStatus[2][language]
            }
      </span>
      <span className={foodInformation.status === "inactive"?"overlay absolute block bg-[#b0a7a773] top-0 left-0 w-full h-full z-[5]":""}></span>
    </div>
  );
};

export default FoodCard;
