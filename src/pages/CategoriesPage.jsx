import AddCategoryFood from "../Modals/AddCategory";
import AddFood from "../Modals/AddFood";
import { ALL_DATA } from "../Query/ALL_DATA";

import FoodCard from "../components/FoodCard";
import { useParams } from "react-router-dom";
import MiniNav from "../components/MiniNav";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMG_BASE_URL } from "../constants/server.BaseUrl";

import { GiMeal } from "react-icons/gi";
import Loading from "../components/Loading";

const CategoriesPage = () => {
  const { restaurantId, categoryId } = useParams();

  const getCategories = ALL_DATA.useCategory(restaurantId);

  const getCategoryById = getCategories?.data?.data.find(
    (category) => category.id === categoryId
  );
  console.log(getCategoryById, "errrrrrrrrrrrrr");
  if (getCategories.isLoading) return <Loading />;

  return (
    <div>
      <div className="drink-wrap">
        <div className="relative">
          <div className="drink-header flex justify-between relative  my-3">
            <h2 className="text-[22px] font-bold">{getCategoryById?.name}</h2>
            <AddCategoryFood />
          </div>
          <div className="food-body">
            {getCategoryById?.subcategories.map((subcategory) => (
              <div key={subcategory._id}>
                <div className="flex items-center gap-2 mb-3">
                  {subcategory?.image_url !== "" ? (
                    <LazyLoadImage
                      src={`${IMG_BASE_URL}${subcategory.image_url}`}
                      className="w-7 h-7"
                    />
                  ) : (
                    <span className="text-blue-500">
                      <GiMeal size={30} />
                    </span>
                  )}
                  <p className="text-2xl">{subcategory?.name}</p>
                </div>
                <div className="flex flex-wrap items-start gap-3">
                  {subcategory?.foods.map((food) => (
                    <FoodCard key={food._id} food={food} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <AddFood />
        </div>
      </div>
      <MiniNav />
    </div>
  );
};

export default CategoriesPage;
