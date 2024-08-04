"use client"

import { RecipesContext, TRecipesContext } from "@/contexts/RecipesContext";
import { Box, Container, Typography, CircularProgress } from "@mui/material"
import { FaBoxOpen } from "react-icons/fa";
import { useContext } from "react";
import Link from "next/link";
import Recipe from "@/components/Recipe";
import User from "@/components/User";

export type TRecipe = {
    name: string;
    duration: string;
    description: string;
    ingredients: string[];
    steps: string[];
}

export default function Recipies(): JSX.Element {
    const { loading, recipes, signedInUser } = useContext(RecipesContext) as TRecipesContext

    if (!signedInUser) {
        return <div className="fixed h-fit w-fit inset-0 m-auto flex flex-col items-center gap-3">
            <CircularProgress />
            <Typography sx={{ fontWeight: 500 }}>Loading...</Typography>
        </div>
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', height: '100svh' }}>
            <header className="flex flex-wrap h-fit items-center justify-between py-5 gap-3 md:gap-0">
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

            <main className="w-full py-10 grid grid-cols-1 auto-rows-auto gap-5 md:grid-cols-3 lg:grid-cols-4">
                {loading &&
                    <Box className="flex justify-center items-center w-full h-full">
                        <section className="flex flex-col items-center gap-3">
                            <CircularProgress />
                            <Typography sx={{ fontWeight: 500 }}>Loading...</Typography>
                        </section>
                    </Box>
                }

                {!loading && recipes && recipes.map((recipe, i) => (<Recipe key={`recipe-${i + 1}`} recipe={recipe} index={i + 1} />))}

                {!loading && !Recipies && <Box className="flex justify-center items-center w-full h-full">
                    <section className="flex flex-col gap-6 w-[70%] md:w-fit p-5 rounded-lg border border-zinc-900">
                        <p className="flex-none w-fit font-manrope font-medium text-base md:text-lg tracking-wide">Could not generate recipes. Add more items to your pantry and try again.</p>
                    </section>
                </Box>}
            </main>
        </Container>
    )
}