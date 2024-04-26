import { Link, useParams } from "react-router-dom";
import { ALL_DATA } from "../Query/ALL_DATA";

const MiniNav = () => {
  const { restaurantId } = useParams();

  const getCategories = ALL_DATA.useCategory(restaurantId);

  return (
    <footer
      className={`fixed z-20 bottom-0 left-0 w-full bg-[rgba(153,107,58,0.99)] ${
        getCategories?.data?.data.length ? " block" : " hidden"
      }`}
    >
      <div className="flex justify-between items-center px-3 container mx-auto py-2">
        {getCategories?.data?.data?.map((category) => (
          <Link
            key={category.id}
            to={`/${restaurantId}/${category.id}`}
            className="text-white  md:text-xl"
          >
            {category?.name}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default MiniNav;
