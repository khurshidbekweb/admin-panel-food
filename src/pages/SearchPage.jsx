import { useSelector } from "react-redux";
import FoodCard from "../components/FoodCard";

const SearchPage = () => {
  const searchValue = useSelector((state) => state.search.searchValue);

  return (
    <div>
      <div className="flex flex-wrap gap-x-3 md:gap-x-5 gap-y-2">
        {searchValue?.length ? (
          searchValue?.map((food) => <FoodCard key={food.id} food={food} />)
        ) : (
          <div>
            <p>Not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
