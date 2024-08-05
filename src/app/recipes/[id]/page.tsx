"use client"

import { Container } from "@mui/material"
import { FaBoxOpen } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import User from "@/components/User";
import { useContext } from "react";
import { PiChefHat } from "react-icons/pi";
import { RecipesContext, TRecipesContext } from "@/contexts/RecipesContext"
import { TRecipe } from "../page";

export default function RecipeDetails(): JSX.Element | undefined {
    const pathname = usePathname()
    const index = Number(pathname.split('/')[2]) - 1
    const { recipes } = useContext(RecipesContext) as TRecipesContext

    if (!recipes) {
        <main className="w-full py-10 grid grid-cols-1 auto-rows-auto gap-5 md:grid-cols-3 lg:grid-cols-4">
            <p>Nothing to see here</p>
        </main>
    } else {

        const recipe = (recipes as TRecipe[]).find((recipe, i) => i === index)
        const { name, description, duration, steps, ingredients } = recipe as TRecipe

        return (
            <Container sx={{ display: 'flex', flexDirection: 'column', height: '100svh', alignItems: 'center' }}>
                <header className="flex-none w-full flex flex-col md:flex-row md:items-center md:justify-between h-fit py-5 gap-3 md:gap-0">
                    <h1 className="order-1 w-fit font-melodrama text-5xl text-zinc-900">Recipe</h1>

                    <div className="order-2 lg:order-3 flex items-center gap-4">
                        <Link
                            className="group grid place-content-center w-10 h-10 bg-cta-primary hover:animate-cta-gradient rounded-full transition-all hover:-translate-y-[2px] active:translate-y-[2px]"
                            href="/"
                            aria-label="Pantry"
                            title="Pantry">
                            <FaBoxOpen className="text-2xl text-zinc-900" />
                        </Link>
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

                <main className="w-fit pb-10">
                    <article className="flex flex-col gap-5 w-full md:max-w-2xl">
                        <section className="flex flex-col gap-3">
                            <h2 className="font-melodrama text-4xl text-zinc-900">{name}</h2>
                            <p className="font-manrope text-base font-medium text-gray-800 tracking-wide">{description}</p>
                            <p className="font-manrope text-sm lg:text-base font-medium text-gray-700 tracking-wide"><span className="text-orange-primary">Duration: </span>{duration}</p>
                        </section>
                        <section className="flex flex-col gap-3">
                            <h3 className="font-melodrama text-3xl text-zinc-900">Ingredients</h3>
                            <ol className="list-decimal font-manrope text-sm lg:text-base font-medium text-gray-700 tracking-wide">
                                {ingredients.map(ingredient => (<li key={ingredient}>{ingredient}</li>))}
                            </ol>
                        </section>

                        <section className="flex flex-col gap-3">
                            <h3 className="font-melodrama text-3xl text-zinc-900">How to prepare</h3>
                            <ol className="list-decimal font-manrope text-sm lg:text-base font-medium text-gray-700 tracking-wide">
                                {steps.map(step => (<li key={step}>{step}</li>))}
                            </ol>
                        </section>
                    </article>
                </main>
            </Container>
        )
    }
}