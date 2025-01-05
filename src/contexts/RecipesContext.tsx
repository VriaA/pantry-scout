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
    loading: boolean | null;
    recipes: TRecipe[] | null;
    signedInUser: User | null | undefined
}

export type Ingredients = {
    newIngredients: string; 
    prevIngredients: string
}

export const RecipesContext = createContext<TRecipesContext | null>(null)

export default function RecipesContextProvider({ children }: { children: ReactNode }): JSX.Element {
    const { setDialog, openDialog, signedInUser } = useContext(AppContext) as TAppContext
    const { pantryItems } = useContext(PantryContext) as TPantryContext
    const [loading, setLoading] = useState<boolean | null>(null)
    const [recipes, setRecipes] = useState<TRecipe[] | null>(null)
    const ingredients = pantryItems ? pantryItems.map(item => item.name).join(', ') : '';

    function compareIngredients() {
        const previousIngredients = JSON.parse(sessionStorage.getItem("prevIngredients") as string) ??  ''
        const sortedNewIngredients = ingredients.split(', ').toSorted().join(', ')
        const sortedOldIngredients = previousIngredients.split(', ').toSorted().join(', ')
        return sortedNewIngredients === sortedOldIngredients
    }

    useEffect(() => {
        async function fetchRecipes() {
            if (!signedInUser || !ingredients) return
            setLoading(() => true)
            try {
                const isSameIngredients = compareIngredients()
                if(isSameIngredients) {
                    const storedRecipes = JSON.parse(sessionStorage.getItem("prevRecipes") as string)
                    setRecipes(() => storedRecipes)
                } else {
                    const response = await fetch(`/api/recipes?ingredients=${encodeURIComponent(ingredients)}`)
                    const data = await response.json()
                    sessionStorage.setItem("prevRecipes", JSON.stringify(data))
                    setRecipes(() => data)
                }
            } catch (error: any) {
                setDialog((prev) => ({ ...prev, message: error.message }))
                openDialog()
            } finally {
                setLoading(() => false)
                sessionStorage.setItem("prevIngredients", JSON.stringify(ingredients))
            }
        };
        fetchRecipes()
    }, [])

    return (<RecipesContext.Provider value={{ loading, recipes, signedInUser }}>
        {children}
    </RecipesContext.Provider>
    )
}