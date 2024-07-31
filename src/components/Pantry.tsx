"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { PantryContext, TPantryContext } from "@/contexts/PantryContext";
import { useContext } from "react";

export default function Pantry(): JSX.Element {
    const { itemsToRender, loading, deleteItem, increaseQuantityByOne, decreaseQuantityByOne } = useContext(PantryContext) as TPantryContext

    if (!itemsToRender && loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!itemsToRender || itemsToRender.length === 0) {
        return <Typography>No pantry items.</Typography>;
    }

    return (
        <Stack>
            {itemsToRender.map((item) => (
                <Box key={item.docId}>
                    <Typography variant="body1">{item.name}</Typography>
                    <Box>
                        <Box>
                            <Button variant="contained" onClick={() => increaseQuantityByOne(item.docId, item.quantity)}>
                                <Add />
                            </Button>
                            <Typography variant="body2">{item.quantity}</Typography>
                            <Button variant="contained" onClick={() => decreaseQuantityByOne(item.docId, item.quantity)}>
                                <Remove />
                            </Button>
                        </Box>
                        <Button variant="contained" onClick={() => deleteItem(item.docId)}>
                            <Delete />
                        </Button>
                    </Box>
                </Box>
            ))}
        </Stack>
    );
}
