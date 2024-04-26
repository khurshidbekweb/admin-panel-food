import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MdTouchApp } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { ALL_DATA } from "../Query/ALL_DATA";
import { useReducer } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FoodUtils } from "../utils/food.utils";
import { QUERY_KEY } from "../Query/QUERY_KEY";
import toast from "react-hot-toast";
import { LuFolderEdit } from "react-icons/lu";
import { MenuItem, Select } from "@mui/material";
import { IMG_BASE_URL } from "../constants/server.BaseUrl";
import { useParams } from "react-router-dom";

// Material UI style
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 2,
  p: 1,
  borderRadius: 2,
};

// useReducer Functions
function reduser(state, action) {
  switch (action.type) {
    case "title": {
      return {
        title: action.titleName,
        description: state.description,
      };
    }
    case "description": {
      return {
        title: state.title,
        description: action.description,
      };
    }
    default: {
      return {
        title: state.title,
        description: state.description,
      };
    }
  }
}
const initionState = { title: {}, description: {} };

const EditFood = ({ data }) => {
  ///////////////////////////////////// Modal open and close
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  ///////////////////////////////////// useReducer
  const [state, dispatch] = useReducer(reduser, initionState);
  const language = ALL_DATA.useLanguage();
  const queryClient = useQueryClient();

  const editFood = useMutation({
    mutationFn: FoodUtils.editFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.category] });
      toast.success("Succes edit");
      handleClose()
    },
    onError: (err) => {
      console.log(err, "Edit food");
      toast.error("Error");
    },
  });

  const handleAddFood = (e) => {
    e.preventDefault();
    const title = Object.keys(state.title).length ===0 ? "" : state.title;
    const description = Object.keys(state.description).length === 0 ? "" : state.description

    editFood.mutate({
      id: data._id,
      food_status: e.target.food_status.value,
      status: e.target.status.value,
      name: title,
      description: description,
      price: e.target.price?.value
    });
    console.log(editFood.variables);
  };

  const handleTitle = (e) => {
    e.preventDefault();
    const title = {};
    for (let lang of language.data) {
      title[lang.code] = e.target[lang.code].value;
    }
    dispatch({
      type: "title",
      titleName: title,
    });
  };
  /////////////////////////////////// Add to titile child modal
  function AddTitle() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <React.Fragment>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          onClick={handleOpen}
          tabIndex={-1}
          startIcon={<MdTouchApp />}
          sx={{ margin: "10px 0", width: "100%", fontSize: "12px" }}
        >
          Edit Title
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby={`child-modal-title${data.id}`}
          aria-describedby={`child-modal-description${data.id}`}
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id={`child-modal-title${data.id}`}>Add title</h2>
            <form onSubmit={handleTitle}>
              {language.data?.length &&
                language.data.map((lang) => {
                  return (
                    <TextField
                      key={lang._id}
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name={lang.code}
                      label={`Add category ${lang.code}`}
                      type="text"
                      variant="standard"
                    />
                  );
                })}
              <button
                type="submit"
                className="ml-auto mt-3 w-[90px] bg-green-600 font-medium text-white p-2 rounded px-3 block"
              >
                Saqlash
              </button>
            </form>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
  //////////////////////////////////// Add description child modal
  function AddDecription() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleAddDescription = (e) => {
      e.preventDefault();
      const description = {};
      for (let des of language.data) {
        description[des.code] = e.target[des.code].value;
      }
      dispatch({
        type: "description",
        description: description,
      });
    };
    return (
      <React.Fragment>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          onClick={handleOpen}
          tabIndex={-1}
          startIcon={<MdTouchApp />}
          sx={{ margin: "15px 0", width: "100%", fontSize: "12px" }}
        >
          Edit Description
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby={`child-modal-title${data.id}`}
          aria-describedby={`child-modal-description${data.id}`}
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id={`child-modal-title${data.id}`}>Add Description</h2>
            <form onSubmit={handleAddDescription}>
              {language.data?.length &&
                language.data.map((lang) => {
                  return (
                    <TextField
                      key={lang._id}
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name={lang.code}
                      label={`Add category ${lang.code}`}
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  );
                })}
              <button
                type="submit"
                className="ml-auto mt-3 w-[90px] bg-green-600 font-medium text-white p-2 rounded px-3 block"
              >
                Saqlash
              </button>
            </form>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
  return (
    <div className="relative z-10">
      <button
        className="absolute z-10 bottom-[-10px] bg-yellow-500 text-white p-1 md:p-2 rounded-full right-11 md:right-14"
        onClick={handleOpen}
      >
        {" "}
        <LuFolderEdit size={20} />{" "}
      </button>
      <Modal
        aria-labelledby={`child-modal-title${data.id}`}
        aria-describedby={`transition-modal-description${data.id}`}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id={`transition-modal-description${data.id}`}
              sx={{ mt: 2 }}
            >
              Add to praduct
            </Typography>
            <form onSubmit={handleAddFood}>
              <div className="title-edit flex items-center gap-3">
                <h2 className="font-bold">Name:</h2>
                <p className="font-medium">{data.name}</p>
              </div>
              <AddTitle />
              <div className="flex items-center gap-3">
                <TextField
                  fullWidth
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="price"
                  label="Price"
                  type="number"
                  variant="standard"
                  defaultValue={data.price}
                />
              </div>
              <div className="title-edit flex items-center gap-3 mt-1 mb-[-10px]">
                <h2 className="font-bold">Description:</h2>
                <p className="font-medium">{data.description}</p>
              </div>
              <AddDecription />
              <div className="foode-status flex items-center gap-3">
                  <FormControl sx={{margin: "20px 0 20px", width:"100%"}}>
                    <InputLabel id="demo-simple-select-label">Food Status</InputLabel>
                    <Select
                      sx={{ width: "100%" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="food_status"
                      label="Food Status"
                      defaultValue="available"
                    >
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="preparing">Preparing</MenuItem>
                      <MenuItem value="none">None</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ margin: "20px 0 20px", width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      sx={{ width: "100%" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="status"
                      label="Status"
                      defaultValue="active"
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  Edit
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
  );
};

export default EditFood;
