import { Add } from "@mui/icons-material";
import SearchField from "./SearchField";
import Link from "next/link";
import { PiChefHat } from "react-icons/pi";
import User from "./User";

export default function Header({ handleClickOpen }: {
    handleClickOpen: () => void
}): JSX.Element {

    return (
        <header className="flex flex-wrap h-fit items-center justify-between py-5 gap-3 md:gap-0">
            <h1 className="order-1 w-fit font-melodrama text-5xl text-center text-zinc-900">Your Pantry</h1>
            <SearchField />

            <div className="order-2 lg:order-3 flex items-center gap-4">
                <button
                    className="grid place-content-center w-10 h-10 bg-cta-primary hover:animate-cta-gradient rounded-full transition-all hover:-translate-y-[2px] active:translate-y-[2px]"
                    aria-label="Add item to pantry"
                    onClick={handleClickOpen}
                    title="Add item to pantry">
                    <Add className="text-2xl" />
                </button>
                <Link
                    className="group grid place-content-center w-10 h-10 bg-cta-primary hover:animate-cta-gradient rounded-full transition-all hover:-translate-y-[2px] active:translate-y-[2px]"
                    href="/recipes"
                    aria-label="Recipies"
                    title="Recipies">
                    <PiChefHat
                        className="text-2xl text-zinc-900" />
                </Link>
                <User />
            </div>
        </header>
    )
}