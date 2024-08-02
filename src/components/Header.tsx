import { Typography, Box, Button } from "@mui/material"
import { Add } from "@mui/icons-material";
import SearchField from "./SearchField";

export default function Header({ handleClickOpen }: {
    handleClickOpen: () => void
}): JSX.Element {
    return (
        <Box component="header" sx={{ display: "flex", height: 'fit-content', alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="body1">Pantry Scout</Typography>
            <SearchField />
            <Button color="primary" aria-label="add" onClick={handleClickOpen}>
                <Add />
            </Button>
        </Box>
    )
}