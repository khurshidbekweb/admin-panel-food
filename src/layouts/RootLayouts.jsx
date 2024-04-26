import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useRestaurant } from "../utils/RestaurantUtils";

const RootLayouts = () => {
  // get Restaurant id
  const { restaurantId } = useParams();

  // get all restaurant
  const getRestaurant = useRestaurant();

  // get restaurant by id
  const getRestaurantById = getRestaurant?.data?.data.find(
    (restourant) => restaurantId === restourant.id
  );

  return (
    <main>
      <div className="sticky top-0 left-0 bg-white z-20">
        <Navbar restaurant={getRestaurantById} />
        <hr className="mb-3" />
      </div>
      <div className="container mx-auto px-3">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayouts;
