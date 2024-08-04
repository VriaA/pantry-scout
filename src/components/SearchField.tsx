"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import { Search } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import { PantryContext, TPantryContext } from "@/contexts/PantryContext";

export default function SearchField() {
    const { setItemsToRender, pantryItems } = React.useContext(PantryContext) as TPantryContext
    const [itemToSearch, setItemToSearch] = React.useState<string>('')

    React.useEffect(() => {
        searchPantry()
    }, [itemToSearch])

    function handleChange(event: React.ChangeEvent) {
        const searchField = event.target as HTMLInputElement
        const searchFieldValue = searchField.value
        setItemToSearch(() => searchFieldValue)
    }

    function searchPantry() {
        if (itemToSearch && itemToSearch.length > 0) {
            const itemInPantry = pantryItems?.filter(item => item.name.toLowerCase().includes(itemToSearch?.trim().toLowerCase()))
            if (itemInPantry) {
                setItemsToRender(() => itemInPantry)
            } else {
                setItemsToRender(() => null)
            }
        } else {
            setItemsToRender(() => pantryItems)
        }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', order: { xs: 3, md: 2 }, width: { xs: "100%", md: "360px", lg: "500px" } }}>
            <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" sx={{ width: "100%" }} label="Search your pantry" variant="standard" name="seach-term" value={itemToSearch} onChange={handleChange} />
        </Box>
    );
}
