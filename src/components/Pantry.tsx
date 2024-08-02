"use client";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { PantryContext, TPantryContext } from "@/contexts/PantryContext";
import { useContext } from "react";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

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
        <Stack spacing={2} direction="row" flexWrap={'wrap'} justifyContent="flex-start" width="100%">
            {itemsToRender.map((item) => (
                <Paper component="section" key={item.docId} sx={{ width: '300px' }}>
                    {item.imageSrc ?
                        <img width={"100%"} height={200} style={{ objectFit: "cover", objectPosition: "center" }} src={item.imageSrc} alt={item.name} />
                        :
                        <Box position="relative" display="flex" width="100%" height={200} sx={{ bgcolor: '#99999920' }}>
                            <ImageNotSupportedIcon fontSize='large' sx={{
                                position: 'absolute', display: 'block', zIndex: 0, inset: 0, margin: 'auto', fill: '#b3b3b350',
                            }} />
                        </Box>
                    }
                    <Box display='flex' justifyContent='space-between' flex="none">
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
                </Paper>
            ))}
        </Stack>
    );
}
