import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import { deleteModal } from '../configs/language';

const DeleteImgModal = ({deleteFn, id}) => {
    const [open, setOpen] = useState(false);
    const language = localStorage.getItem("language")
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteCloseBtn = () =>{
    deleteFn(id)
    handleClose()
  }

    return <React.Fragment>
            <span className='absolute cursor-pointer block top-[98px] md:top-[55px] z-10 bg-red-500 text-white p-1 md:p-2 rounded-full right-5    md:right-4' onClick={handleClickOpen}><MdDelete size={20}/></span> 
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{deleteModal[0][language]}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  {deleteModal[1][language]}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>{deleteModal[2][language]}</Button>
                  <span className='p-2 bg-red-500 text-white cursor-pointer rounded-md' onClick={deleteCloseBtn}>{deleteModal[3][language]}</span>
                </DialogActions>
            </Dialog>
            </React.Fragment>
};

export default DeleteImgModal;