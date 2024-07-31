import { Typography, Box } from "@mui/material"
import Fab from '@mui/material/Fab';
import { Add } from "@mui/icons-material";
import SearchField from "./SearchField";

export default function Header({ handleClickOpen }: {
    handleClickOpen: () => void
}): JSX.Element {
    return (
        <Box component="header" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="body1">Pantry Scout</Typography>
            <SearchField />
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                <Add />
            </Fab>
        </Box>
    )
}