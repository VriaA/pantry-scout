"use client"
import { AppContext } from "@/contexts/AppContext"
import { TAppContext } from "@/types/app"
import { Container, Typography, CircularProgress } from "@mui/material"
import { useState } from "react";
import * as React from 'react';
import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import FormModal from "@/components/pantry/FormModal";
import Pantry from "@/components/pantry/Pantry";
import Header from "@/components/pantry/Header"

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
    return <div className="fixed h-fit w-fit inset-0 m-auto flex flex-col items-center gap-3">
      <CircularProgress />
      <Typography sx={{ fontWeight: 500 }}>Loading...</Typography>
    </div>
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100svh' }}>
      <Header handleClickOpen={handleClickOpen} />
      <Pantry handleClickOpen={handleClickOpen} />
      <FormModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  )
}