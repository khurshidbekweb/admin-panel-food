import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  styled,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { ALL_DATA } from "../Query/ALL_DATA";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TranslateUtils } from "../utils/translate.utils";
import { QUERY_KEY } from "../Query/QUERY_KEY";
import { useParams } from "react-router-dom";
import { CategoryUtils } from "../utils/categoryutils";
import toast from "react-hot-toast";

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

const AddMainCategory = () => {
  const queryClient = useQueryClient();
  const language = ALL_DATA.useLanguage();
  const translate = ALL_DATA.useTranslete();

  const { restaurantId } = useParams();

  const [open, setOpen] = useState(false);
  const categoryImg = useRef();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const showImage = async (e) => {
    categoryImg.current.src = await getBase64Full(e.target.files[0]);
    categoryImg.current.classList.remove("hidden");
  };

  // Add taranslete and Category functions
  const addTranslate = useMutation({
    mutationFn: TranslateUtils.postTranslate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.translete] });
    },
    onError: (err) => {
      console.log(err, "Add translete");
    },
  });

  const addCategory = useMutation({
    mutationFn: CategoryUtils.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.category] });
      toast.success("Add category success");
    },
    onError: (err) => {
      console.log(err, "add Category");
      toast.error("Xatolik");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = {};
    for (const el of language.data) {
      name[el.code] = e.target[el.code].value;
    }

    addTranslate.mutate({
      code: e.target.translete_code.value,
      definition: name,
      type: "content",
    });

    addCategory.mutate({
      name: translate.data?.at(translate.data?.length - 1)._id,
      image: e.target.image_category.files[0],
      category_id: "",
      restaurant_id: restaurantId,
    });
    setOpen(false);
  };

  return (
    <>
      <React.Fragment>
        <Button onClick={handleClickOpen}>Add Category</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogContent sx={{}}>
            <DialogContentText>Create main category</DialogContentText>
            <div className="miniwrap-image flex gap-x-4 md:gap-x-10 items-center">
              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                onChange={showImage}
                name="image_category"
                startIcon={<BiCloudUpload />}
                sx={{ margin: "25px 0 10px 0" }}
              >
                Upload file
                <VisuallyHiddenInput name="image_category" type="file" />
              </Button>
              <img
                width={90}
                ref={categoryImg}
                className="hidden rounded-lg"
                src=""
                alt="img"
              />
            </div>
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="translete_code"
                label={`Add category name code`}
                type="text"
                fullWidth
                variant="standard"
              />
              {language?.data.length &&
                language.data.map((lan) => (
                  <TextField
                    key={lan._id}
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name={lan.code}
                    label={`Add category name ${lan.code}`}
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default AddMainCategory;
