import { Box } from "@mui/material";

export default function Loading() {
    return (
        <div className={`flex w-full h-full items-center justify-center`}>
            <div className="w-10 h-10 md:w-20 md:h-20 bg-black rounded-full animate-leftPreload md:animate-leftPreloadMd"></div>
            <div className="w-10 h-10 md:w-20 md:h-20 bg-slate-100/10 rounded-full backdrop-blur-sm animate-rightPreload md:animate-rightPreloadMd"></div>
        </div >
    );
}  