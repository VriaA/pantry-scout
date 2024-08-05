import Link from "next/link"

export default function NoRecipes(): JSX.Element {
    return (
        <div className="flex-1 flex justify-center items-center w-full h-full">
            <section className="flex flex-col gap-6 w-[70%] md:w-[300px] p-5 rounded-lg border border-zinc-800">
                <h2 className="w-fit font-manrope font-bold text-base md:text-lg tracking-wide !leading-none">
                    Could not generate recipes.
                </h2>
                <p className="font-manrope font-medium text-base md:text-lg tracking-wide">Add more items to your pantry and try again.</p>
                <Link href="/" className="py-2 px-6 text-center text-base md:text-lg !leading-none font-manrope tracking-wide font-bold bg-cta-primary hover:animate-cta-gradient text-zinc-900 rounded-lg">
                    Add
                </Link>
            </section>
        </div>
    )
}