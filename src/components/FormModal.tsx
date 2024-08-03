"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AppContext } from '@/contexts/AppContext';
import { TAppContext } from '@/types/app';
import CameraPro from "./CameraPro";
import { PantryContext, TPantryContext } from "@/contexts/PantryContext";
import classifier from "@/helpers/classifier";

type TFormModal = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormModal({ isOpen, setIsOpen }: TFormModal) {
  const { setDialog, openDialog } = React.useContext(AppContext) as TAppContext
  const { pantryItems, increaseQuantityByOne, addItem, setImage, image } = React.useContext(PantryContext) as TPantryContext
  const [itemName, setItemName] = React.useState<string>('')
  const [isLoadingName, setIsLoadingName] = React.useState<boolean>(false)

  React.useEffect(() => {
    async function getName() {
      setIsLoadingName(() => true)
      const name = await classifier(image)
      setItemName(() => name)
      setIsLoadingName(() => false)
    }

    image ? getName() : setItemName(() => '')
  }, [image])

  function handleNameChange(e: React.ChangeEvent) {
    const input = e.target as HTMLFormElement
    setItemName(() => input.value)
  }

  function handleAddBtnClick(event: React.FormEvent) {
    event.preventDefault()
    const newItem = itemName

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
      setImage(() => undefined)
      setItemName(() => '')
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
          onSubmit: handleAddBtnClick
        }}
      >
        <DialogTitle>Add an item to your pantry</DialogTitle>
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
            value={itemName}
            onChange={handleNameChange}
          />
          <CameraPro isLoadingName={isLoadingName} itemName={itemName} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit">Add item</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
