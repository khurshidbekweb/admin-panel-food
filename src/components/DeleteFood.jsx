import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import { deleteModal } from "../configs/language";



const DeleteFood = ({deleteFn, id}) => {    
  const [open, setOpen] = useState(false);
  const language = localStorage.getItem("language")
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
        className="absolute block top-[130px] md:top-[275px] z-10 bg-red-500 text-white p-1 md:p-2 rounded-full right-2 md:right-4"
        onClick={handleClickOpen}
      >
        <MdDelete size={20} />
      </button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{deleteModal[0][language]}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`alert-dialog-slide-description ${id}`}>
            {deleteModal[1][language]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{deleteModal[2][language]}</Button>
          <Button
            sx={{ backgroundColor: "red", padding: "3px", color: "white" }}
            onClick={deleteCloseBtn}
          >
            {deleteModal[3][language]}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteFood;
