"use client"
import { AppContext } from "@/contexts/AppContext"
import { TAppContext } from "@/types/app"
import { Container, Typography } from "@mui/material"
import { useContext } from "react"
import { useRouter } from "next/navigation"

export default function App(): JSX.Element {
    const { signedInUser } = useContext(AppContext) as TAppContext
    const router = useRouter()

    return (<>
        {signedInUser ?
            <Container>
                <Typography variant="body1">Pantry Scout</Typography>
            </Container>
            : router.push(`/sign-in`)
        }
    </>
    )
}