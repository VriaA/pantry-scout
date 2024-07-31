import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AppContext } from '@/contexts/AppContext';
import { TAppContext } from '@/types/app';
import usePantry from "@/hooks/usePantry";

type TFormModal = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormModal({ isOpen, setIsOpen }: TFormModal) {
  const { setDialog, openDialog } = React.useContext(AppContext) as TAppContext
  const { pantryItems, increaseQuantityByOne, addItem } = usePantry()

  function handleAddBtnClick(formData: FormData) {
    const newItem = formData.get('item')

    try {
      if (!newItem) return
      if (pantryItems && pantryItems.length > 0) {
        const itemInPantry = pantryItems.find(item => item.name.toLowerCase() === newItem.toString().toLowerCase())
        itemInPantry ? increaseQuantityByOne(itemInPantry.docId, itemInPantry.quantity) : addItem(newItem)
        return
      }
      addItem(newItem)

    } catch (error: any) {
      setDialog((prev) => ({ ...prev, message: error.message }))
      openDialog()
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
          action: handleAddBtnClick,
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
