import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Fragment, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryUtils } from "../utils/categoryutils";
import { QUERY_KEY } from "../Query/QUERY_KEY";
import { ALL_DATA } from "../Query/ALL_DATA";
import { TranslateUtils } from "../utils/translate.utils";

const AddTranslete = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const language = ALL_DATA.useLanguage();
  console.log(language.data);
  const addCategory = useMutation({
    mutationFn: CategoryUtils.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.category] });
    },
    onError: (err) => {
      console.log(err, "add Category");
    },
  });
  const addTranslate = useMutation({
    mutationFn: TranslateUtils.postTranslate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.translete] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddCotegory = (e) => {
    e.preventDefault();
    addTranslate.mutate({});
  };
  return (
    <Fragment>
      <Button onClick={handleClickOpen}>Add Category</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleAddCotegory,
        }}
      >
        <DialogContent>
          <DialogContentText>To subscribe to this website</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="code"
            label="Translete code"
            type="text"
            fullWidth
            variant="standard"
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AddTranslete;
