"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { PantryContext, TPantryContext } from "@/contexts/PantryContext";
import { useContext } from "react";

export default function Pantry({ handleClickOpen }: { handleClickOpen: () => void }): JSX.Element {
    const { itemsToRender, loading, deleteItem, increaseQuantityByOne, decreaseQuantityByOne } = useContext(PantryContext) as TPantryContext

    if (!itemsToRender && loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!itemsToRender || itemsToRender.length === 0) {
        return <NoPantryItems />
    }

    function NoPantryItems(): JSX.Element {
        return (
            <Box component="section"
                width='100%'
                height='100%'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                <Typography
                    variant="h1"
                    sx={{ fontSize: '18px' }}>No pantry items</Typography>
                <Button
                    onClick={handleClickOpen}>
                    <Add />
                </Button>
            </Box>
        )
    }

    return (
        <Stack>
            {itemsToRender.map((item) => (
                <Box component="section" key={item.docId} display='flex' justifyContent='space-between'>
                    <Typography variant="h2">{item.name}</Typography>
                    <Box display='flex'>
                        <Box display='flex' alignItems='center'>
                            <Button onClick={() => increaseQuantityByOne(item.docId, item.quantity)}>
                                <Add />
                            </Button>
                            <Typography variant="body2">{item.quantity}</Typography>
                            <Button onClick={() => decreaseQuantityByOne(item.docId, item.quantity)}>
                                <Remove />
                            </Button>
                        </Box>
                        <Button onClick={() => deleteItem(item.docId)}>
                            <DeleteOutlineOutlinedIcon />
                        </Button>
                    </Box>
                </Box>
            ))}
        </Stack>
    );
}
