"use client"
import { AppContext } from "@/contexts/AppContext"
import { TAppContext } from "@/types/app"
import { Container, Typography } from "@mui/material"
import { useState } from "react";
import * as React from 'react';
import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import FormModal from "@/components/FormModal";
import Pantry from "@/components/Pantry";
import Header from "@/components/Header";

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
    return <Typography>Loading...</Typography>
  }

  return (
    <Container>
      <Header handleClickOpen={handleClickOpen} />
      <Pantry />
      <FormModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  )
}