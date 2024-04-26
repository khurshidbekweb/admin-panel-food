import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MdDelete } from "react-icons/md";

const DeleteConfirmation = ({ deleteFn, id }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteCloseBtn = () => {
    deleteFn(id);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        className="absolute bottom-3 block right-2 z-50 bg-red-500 text-white p-1 md:p-1 rounded"
        onClick={handleClickOpen}
      >
        <MdDelete size={23} />
      </button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`alert-dialog-slide-description ${id}`}>
            If you continue, you will permanently delete this record. Are you
            sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            sx={{ backgroundColor: "red", padding: "3px", color: "white" }}
            onClick={deleteCloseBtn}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteConfirmation;
