"use client"

import { RecipesContext, TRecipesContext } from "@/contexts/RecipesContext";
import { Box, Container, Typography, CircularProgress } from "@mui/material"
import { FaBoxOpen } from "react-icons/fa";
import { useContext } from "react";
import Link from "next/link";
import Recipe from "@/components/recipes/Recipe";
import User from "@/components/User";
import Loader from "@/components/Loader"
import NoRecipes from "@/components/recipes/NoRecipes"

export type TRecipe = {
    name: string;
    duration: string;
    description: string;
    ingredients: string[];
    steps: string[];
}

export default function Recipes(): JSX.Element {
    const { loading, recipes, signedInUser } = useContext(RecipesContext) as TRecipesContext

    if (!signedInUser) {
        return <div className="fixed h-fit w-fit inset-0 m-auto flex flex-col items-center gap-3">
            <CircularProgress />
            <Typography sx={{ fontWeight: 500 }}>Loading...</Typography>
        </div>
    }

    function AllRecipes(): JSX.Element {
        return (
            <div className="flex-1 py-10 grid grid-cols-1 auto-rows-auto gap-5 md:grid-cols-3 lg:grid-cols-4">
                {recipes?.map((recipe, i) => (<Recipe key={`recipe-${i + 1}`} recipe={recipe} index={i + 1} />))}
            </div>
        )
    }

    const DataToRender = () => {
        if (loading) {
            return <Loader />
        } else {
            if (!recipes || recipes.length < 0) {
                return <NoRecipes />
            } else {
                return <AllRecipes />
            }
        }
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', height: '100svh' }}>
            <header className="flex flex-col md:flex-row md:items-center md:justify-between h-fit py-5 gap-3 md:gap-0">
                <h1 className="order-1 w-fit font-melodrama text-5xl text-center text-zinc-900">Your Recipies</h1>

                <div className="order-2 lg:order-3 flex items-center gap-4">
                    <Link
                        className="group grid place-content-center w-10 h-10 bg-cta-primary hover:animate-cta-gradient rounded-full transition-all hover:-translate-y-[2px] active:translate-y-[2px]"
                        href="/"
                        aria-label="Pantry"
                        title="Pantry">
                        <FaBoxOpen className="text-2xl text-zinc-900" />
                    </Link>
                    <User />
                </div>
            </header>

            <main className="flex flex-1">
                <DataToRender />
            </main>
        </Container>
    )
}