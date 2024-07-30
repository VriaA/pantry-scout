"use client"
import { AppContext } from "@/contexts/AppContext"
import { TAppContext } from "@/types/app"
import { Container, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import Loading from "./loading"

export default function Home() {
  const { signedInUser } = useContext(AppContext) as TAppContext
  const router = useRouter()

  useEffect(() => {
    if (signedInUser === null) {
      router.push("sign-in")
    }
  }, [signedInUser, router])

  if (!signedInUser) {
    return <Loading />
  }

  return (
    <Container>
      <Typography variant="body1">Pantry Scout</Typography>
    </Container>
  )
}