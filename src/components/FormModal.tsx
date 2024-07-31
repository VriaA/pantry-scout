import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addDoc, serverTimestamp, collection } from "firebase/firestore"
import { db } from "@/firebase"
import { AppContext } from '@/contexts/AppContext';
import { TAppContext } from '@/types/app';

type TFormModal = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormModal({isOpen, setIsOpen}: TFormModal) {
  const { setDialog, openDialog, signedInUser } = React.useContext(AppContext) as TAppContext

  function addItem(formData: FormData) {
    const newItem =  formData.get('item')
    try {
      addDoc(collection(db, "pantry"), {
        name: newItem,
        quantity: 1,
        userId: signedInUser?.uid,
        timestamp: serverTimestamp()
      })
    } catch(error: any) {
        setDialog((prev)=> ({...prev, message: error.message}))
        openDialog()
      console.log(error)
    } finally {
        handleClose()
    }
  }

  const handleClose = () => setIsOpen(false)

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          action: addItem,
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="item"
            name="item"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit">Add item</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
