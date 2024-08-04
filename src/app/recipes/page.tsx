"use client"
import { AppContext } from "@/contexts/AppContext";
import { PantryContext, TPantryContext } from "@/contexts/PantryContext"
import { TAppContext } from "@/types/app";
import { useContext, useEffect, useState, useMemo } from "react"

type TRecipe = {
    name: string;
    duration: string;
    description: string;
    ingredients: string[];
    steps: string[];
}

export default function Recipies(): JSX.Element {
    const { pantryItems } = useContext(PantryContext) as TPantryContext
    const { setDialog, openDialog } = useContext(AppContext) as TAppContext
    const [loading, setLoading] = useState<boolean>(false)
    const [recipes, setRecipes] = useState<TRecipe[] | null>(null)

    const ingredients = useMemo(() => {
        return pantryItems ? pantryItems.map(item => item.name).join(', ') : '';
    }, [pantryItems]);

    useEffect(() => {
        async function fetchRecipes() {
            if (!pantryItems) return
            setLoading(() => true)

            try {
                const response = await fetch(`/api/openai?ingredients=${encodeURIComponent(ingredients)}`)
                const data = await response.json()
                console.log(data)
                setRecipes(() => data)
            } catch (error: any) {
                setDialog((prev) => ({ ...prev, message: error.message }))
            } finally {
                setLoading(() => false)
            }
        };
        fetchRecipes()
    }, [ingredients])
    return (
        <></>
    )
}