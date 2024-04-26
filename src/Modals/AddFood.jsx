import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { BiCloudUpload } from "react-icons/bi";
import { MdTouchApp } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState } from "react";
import { useRef } from "react";
import { ALL_DATA } from "../Query/ALL_DATA";
import { useReducer } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FoodUtils } from "../utils/food.utils";
import { QUERY_KEY } from "../Query/QUERY_KEY";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { addModal } from "../configs/language";

// Images transform getbase64Full
async function getBase64Full(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

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
const btnStyle = {
  position: "fixed",
  right: "5%",
  top: "76%",
  backgroundColor: "#6AD4DD",
  overflow: "hidden",
  padding: "5px 0",
  border: "1px solid silver",
  borderRadius: "50%",
  color: "#000",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

const AddFood = () => {
  const params = useParams();
  const langCode = localStorage.getItem("language")
  ///////////////////////////////////// Modal open and close
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  ///////////////////////////////////// useReducer
  const [state, dispatch] = useReducer(reduser, initionState);
  const praductImgs = useRef();
  const getCategoryFood = ALL_DATA.useCategory(params.restaurantId);
  const category = getCategoryFood?.data?.data.find(
    (el) => el.id === params.categoryId
  );
  const language = ALL_DATA.useLanguage();
  const queryClient = useQueryClient();

  const addFood = useMutation({
    mutationFn: FoodUtils.addFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.category]});
      toast.success("Succes add food");
      handleClose()
    },
    onError: (err) => {
      console.log(err, "Error add food");
    },
  });

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
  const handleAddFood = (e) => {
    e.preventDefault();
    const images = [];
    console.log(e.target.images?.files.length);
    for (let i = 0; i < e.target.images?.files.length; i++) {
      images.push(e.target.images.files[i]);
    }
    addFood.mutate({
      images: images,
      name: state.title,
      description: state.description,
      price: e.target.price?.value,
      category_id: e.target.category_id?.value,
      restourant_id: params.restaurantId,
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
          sx={{ margin: "25px 0 10px 0", width: "100%", fontSize: "12px" }}
        >
          {addModal[1][langCode]}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Add title</h2>
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
                      label={`Add food name ${lang.code}`}
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
  //////////////////////////////////// Add description child modal
  function AddDecription() {
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
          sx={{ margin: "25px 0 10px 0", width: "100%", fontSize: "12px" }}
        >
          {addModal[4][langCode]}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Add Description</h2>
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
    <div className="relative z-30">
      <Button sx={btnStyle} onClick={handleOpen}>
        <Typography sx={{ fontSize: "35px" }}>+</Typography>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {addModal[0][langCode]}
            </Typography>
              <AddTitle />
            <form onSubmit={handleAddFood}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<BiCloudUpload />}
                sx={{
                  margin: "25px 0 10px 0",
                  width: "100%",
                  fontSize: "12px",
                }}
                onChange={showImages}
              >
                {addModal[2][langCode]}
                <VisuallyHiddenInput name="images" multiple type="file" />
              </Button>
              {/* Showe chald image */}
              <div
                ref={praductImgs}
                className="flex flex-wrap gap-1 w-[100%]"
              ></div>
              <div className="flex items-center gap-3">
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="price"
                  label={addModal[3][langCode]}
                  type="number"
                  variant="standard"
                />
                <Box sx={{ minWidth: 120, marginTop: "4px" }}>
                  <FormControl>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Category
                    </InputLabel>
                    <NativeSelect name="category_id">
                      {category.subcategories?.length &&
                        category.subcategories.map((ctg) => {
                          return (
                            <option key={ctg._id} value={ctg._id}>
                              {ctg.name}
                            </option>
                          );
                        })}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </div>
              <AddDecription />
              <Button
                className="w-full"
                type="submit"
                variant="contained"
                color="success"
              >
                {addModal[5][langCode]}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
  // Show praduct images
  async function showImages(e) {
    const images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(await getBase64Full(e.target.files[i]));
    }
    for (let image of images) {
      praductImgs.current.insertAdjacentHTML(
        "beforeend",
        `<img src=${image} width='65' alt="praduct-image" className="overflow-hidden rounded-md"/>`
      );
    }
  }
};

export default AddFood;
