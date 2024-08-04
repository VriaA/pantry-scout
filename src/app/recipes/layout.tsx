import RecipiesContextProvider from "@/contexts/RecipesContext"

export default function RecipesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <RecipiesContextProvider>
            {children}
        </RecipiesContextProvider>
    )
}