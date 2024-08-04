import { Typography, Box, Button } from "@mui/material"
import { Add } from "@mui/icons-material";
import SearchField from "./SearchField";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Link from "next/link";

export default function Header({ handleClickOpen }: {
    handleClickOpen: () => void
}): JSX.Element {
    return (
        <Box component="header" sx={{ display: "flex", height: 'fit-content', alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="body1">Pantry Scout</Typography>
            <SearchField />

            <Box display="flex" alignItems="center" gap="12px" >
                <Button color="primary" aria-label="Add item to pantry" onClick={handleClickOpen} title="Add item to pantry">
                    <Add />
                </Button>
                <Link href="/recipes" aria-label="Recipies" title="Recipies">
                    <AutoStoriesIcon />
                </Link>
            </Box>
        </Box>
    )
}