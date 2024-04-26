import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LanguageUtils } from "../utils/language.utils";
import { QUERY_KEY } from "../Query/QUERY_KEY";

const AddLanguage = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const addlanguage = useMutation({
    mutationFn: LanguageUtils.addLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.language] });
      submit.current.hidden = true;
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const submit = React.useRef();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddLanguage = (e) => {
    e.preventDefault();
    addlanguage.mutate({
      code: e.target.code.value,
      title: e.target.title.value,
    });
    console.log(addlanguage.variables);
  };
  return (
    <React.Fragment>
      <Button
        sx={{ fontSize: "10px", color: "black", border: "1px solid silver" }}
        onClick={handleClickOpen}
      >
        Add Language
      </Button>
      <Dialog
        ref={submit}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleAddLanguage,
        }}
      >
        <DialogContent>
          <DialogContentText>Til qo`shish</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="code"
            label="Add language code"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Add language title"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddLanguage;
