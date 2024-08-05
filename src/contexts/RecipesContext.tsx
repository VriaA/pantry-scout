"use client"

import { useState, useEffect, useContext, useMemo, createContext, ReactNode } from "react"
import { AppContext } from "./AppContext"
import { TAppContext } from "@/types/app"
import { PantryContext, TPantryContext } from "@/contexts/PantryContext"
import { User } from "firebase/auth"

export type TRecipe = {
    name: string;
    duration: string;
    description: string;
    ingredients: string[];
    steps: string[];
}

export type TRecipesContext = {
    loading: boolean;
    recipes: TRecipe[] | null;
    signedInUser: User | null | undefined
}

export const RecipesContext = createContext<TRecipesContext | null>(null)

export default function RecipiesContextProvider({ children }: { children: ReactNode }): JSX.Element {
    const { setDialog, openDialog, signedInUser } = useContext(AppContext) as TAppContext
    const { pantryItems } = useContext(PantryContext) as TPantryContext
    const [loading, setLoading] = useState<boolean>(false)
    const [recipes, setRecipes] = useState<TRecipe[] | null>(null)

    const ingredients = useMemo(() => {
        return pantryItems ? pantryItems.map(item => item.name).join(', ') : '';
    }, [pantryItems]);

    useEffect(() => {
        async function fetchRecipes() {
            if ((recipes && recipes.length > 0) || !signedInUser || !pantryItems || !ingredients) return
            setLoading(() => true)
            try {
                const response = await fetch(`/api/openai?ingredients=${encodeURIComponent(ingredients)}`)
                const data = await response.json()
                setRecipes(() => data)
            } catch (error: any) {
                setDialog((prev) => ({ ...prev, message: error.message }))
                openDialog()
            } finally {
                setLoading(() => false)
            }
        };
        fetchRecipes()
    }, [ingredients])

    return (<RecipesContext.Provider value={{ loading, recipes, signedInUser }}>
        {children}
    </RecipesContext.Provider>
    )
}