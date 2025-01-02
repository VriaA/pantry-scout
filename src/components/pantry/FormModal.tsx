"use client"

import * as React from 'react';
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
          sx: { padding: "20px 0" },
          onSubmit: handleAddBtnClick,
        }}>
        <DialogTitle sx={{ fontFamily: "Melodrama-Variable", fontSize: '36px', lineHeight: 1 }}>Add an item to your pantry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="none"
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
        <DialogActions sx={{ gap: '8px', padding: '0px 20px' }}>
          <button type="button" onClick={handleClose}
            className="py-2 px-6 text-center border border-zinc-900 text-zinc-900 font-semibold tracking-wide rounded-lg hover:text-red-600 hover:border-red-600">Close</button>
          <button type="submit" className="py-2 px-6 font-manrope tracking-wide font-bold bg-cta-primary hover:animate-cta-gradient text-zinc-900 rounded-lg">Add item</button>
        </DialogActions>
      </Dialog>
    </React.Fragment >
  );
}
