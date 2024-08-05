import { CircularProgress } from "@mui/material"

export default function Loader({ message = "Loading" }: { message: string }): JSX.Element {
    return (<div className="flex-1 flex justify-center items-center w-full h-full">
        <section className="flex flex-col items-center gap-3">
            <CircularProgress />
            <p className="font-medium">{message}...</p>
        </section>
    </div>)
}