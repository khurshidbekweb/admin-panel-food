import { Link, useParams } from "react-router-dom";
import { ALL_DATA } from "../Query/ALL_DATA";
import Loading from "../components/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMG_BASE_URL } from "../constants/server.BaseUrl";
import AddMainCategory from "../Modals/AddMainCategory";
import DeleteConfirmation from "../components/DeleteMainCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryUtils } from "../utils/categoryutils";
import { QUERY_KEY } from "../Query/QUERY_KEY";
import toast from "react-hot-toast";

const Home = () => {
  const { restaurantId } = useParams();

  const getMainCategories = ALL_DATA.useCategory(restaurantId);

  const queryClient = useQueryClient();

  const deleteCategory = useMutation({
    mutationFn: CategoryUtils.deleteCatefory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.category] });
      toast.success("Delete success");
    },
    onError: (err) => {
      console.log(err, "Delete food");
      toast.error("Error");
    },
  });

  if (getMainCategories.isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-2xl">Home Page</h4>
        <AddMainCategory />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-10">
        {getMainCategories?.data?.data.length ? (
          getMainCategories?.data?.data.map((category) => (
            <div
              key={category?.id}
              className="border  mb-4 rounded-[10px] max-w-[500px] w-full relative z-10"
            >
              <Link to={`${category.id}`}>
                <LazyLoadImage
                  src={`${IMG_BASE_URL}${category.image_url}`}
                  alt={category?.name}
                  className="rounded-t-[10px] w-full h-full"
                  height={280}
                  effect="blur"
                />
              </Link>
              <div>
                <h3 className="text-2xl py-2 pl-2">{category?.name.trim()}</h3>
              </div>
              <DeleteConfirmation
                deleteFn={deleteCategory.mutate}
                id={category.id}
              />
            </div>
          ))
        ) : (
          <div>No category yet:(</div>
        )}
      </div>
    </div>
  );
};

export default Home;
