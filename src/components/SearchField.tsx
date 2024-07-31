import * as React from 'react';
import Box from '@mui/material/Box';
import { Search } from "@mui/icons-material";
import TextField from '@mui/material/TextField';

export default function SearchField() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Search your pantry" variant="standard" />
        </Box>
    );
}
