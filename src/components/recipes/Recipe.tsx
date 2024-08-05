"use client";

import { TRecipe } from "@/app/recipes/page"
import Link from "next/link"
export default function Recipe({ recipe, index }: { recipe: TRecipe, index: number }): JSX.Element {
    const { name, description, duration } = recipe

    return (
        <Link href={`/recipes/${index}`}
            key={name} className="flex flex-col gap-3 w-full p-5 rounded-lg border border-zinc-900">
            <h2 className="w-full text-xl lg:text-3xl tracking-wide font-melodrama capitalize font-semibold break-words" >{name}</h2>
            <p className="font-manrope text-sm lg:text-base font-medium text-gray-700 tracking-wide">{duration}</p>
            <p className="font-manrope text-base font-medium text-gray-800 tracking-wide">{description}</p>
            <Link href={`/recipes/${index}`} className="font-manrope text-sm lg:text-base font-medium hover:underline text-orange-primary tracking-wide">read more</Link>
        </Link>
    );
}
