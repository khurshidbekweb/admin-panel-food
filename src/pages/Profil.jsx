import { useParams } from "react-router-dom";
import { ALL_DATA } from "../Query/ALL_DATA";
import Cleave from "cleave.js/react";
import { useRestaurant } from "../utils/RestaurantUtils";
import Loading from "../components/Loading";
import { UserUtils } from "../utils/userUtils";
import { QUERY_KEY } from "../Query/QUERY_KEY";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Profil = () => {
  const { restaurantId } = useParams();

  const queryClient = useQueryClient();

  const getUsers = ALL_DATA.useUsers();

  const getRestaurant = useRestaurant();

  const getUserByRestaurantId = getUsers?.data?.find(
    (user) => user.restourant_id === restaurantId
  );

  // get restaurant by id
  const getRestaurantById = getRestaurant?.data?.data.find(
    (restourant) => restaurantId === restourant.id
  );

  // edit user function
  const editUser = useMutation({
    mutationFn: UserUtils.editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.user],
      });
      toast.success("User updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleChangeInformation = (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const password = e.target.password.value;
    const phoneNumber = e.target.number.value.replaceAll(" ", "");
    const id = getUserByRestaurantId?._id;

    editUser.mutate({ fullName, password, phoneNumber, id });
  };

  if (getUsers.isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl mb-4">{getRestaurantById?.name}</h1>
      <div>
        <form onSubmit={handleChangeInformation}>
          <label className="mb-3 block">
            <span className="cursor-pointer mb-[2px]">User Name</span>
            <input
              type="text"
              defaultValue={getUserByRestaurantId?.full_name}
              className="border-2 py-1 px-3 rounded focus:border-gray-500"
              name="fullName"
            />
          </label>

          <label className="block mb-3">
            <span className="cursor-pointer mb-[2px]">Phone number</span>
            <Cleave
              options={{
                numeralPositiveOnly: true,
                prefix: "+998",
                delimiter: " ",
                blocks: [4, 2, 3, 2, 2],
              }}
              name="number"
              className="border-2 py-1 px-3 rounded focus:border-gray-500"
              value={getUserByRestaurantId?.phone}
            />
          </label>

          <label className="mb-3 block">
            <span className="cursor-pointer mb-[2px]">New Password</span>
            <input
              type="text"
              className="border-2 py-1 px-3 rounded focus:border-gray-500"
              name="password"
              placeholder="enter new password..."
            />
          </label>

          <button className="bg-gray-500 text-white py-2 px-4 rounded active:bg-gray-600">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profil;
