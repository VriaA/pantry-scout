"use client"
import { AppContext } from "@/contexts/AppContext"
import { TAppContext } from "@/types/app"
import { Container, Typography } from "@mui/material"
import { useState } from "react";
import * as React from 'react';
import Fab from '@mui/material/Fab';
import { Add } from "@mui/icons-material";
import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import Loading from "./loading"
import FormModal from "@/components/FormModal";

export default function Home() {
  const { signedInUser } = useContext(AppContext) as TAppContext
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOpen = () => setIsOpen(true)

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
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <Add />
      </Fab>
      <FormModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  )
}