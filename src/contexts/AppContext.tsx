"use client"

import { createContext, ReactNode } from "react"
import { useEffect, useState, useRef } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { TAppContext, TDialog } from "@/types/app";
import { useRouter } from "next/navigation";
export const AppContext = createContext<TAppContext | null>(null)

export default function AppContextProvider({ children }: { children: ReactNode }): JSX.Element {
    const [isLoggedIn, setisLoggedIn] = useState<boolean | null>(false);
    const [signedInUser, setSignedInUser] = useState<User | undefined | null>(undefined);
    const [dialog, setDialog] = useState<TDialog>({
        message: null,
        isOpen: false,
    });
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setisLoggedIn(user ? true : false);
            setSignedInUser(() => user);
        });
    }, []);

    useEffect(() => {
        if (signedInUser === null) {
          router.push("/sign-in")
        }
    }, [signedInUser, router])

    function openDialog(): void {
        setDialog((prevDialog) => ({ ...prevDialog, ["isOpen"]: true }));
        dialogRef.current?.showModal();
    }

    function closeDialog(): void {
        setDialog((prevDialog) => ({ ...prevDialog, message: "", isOpen: false }));
        dialogRef.current?.close();
    }

    return (
        <AppContext.Provider value={{ isLoggedIn, signedInUser, openDialog, setDialog }}>
            {children}
            <dialog
                className={`${dialog.isOpen ? "flex" : ""} fixed inset-0 m-auto flex-col gap-6 items-start w-[70%] max-w-[300px] p-5 backdrop:bg-zinc-900/40 font-manrope rounded-lg`}
                ref={dialogRef}>
                <p className="text-base font-medium">{dialog.message}</p>
                <button
                    className="self-end bg-red-800 text-slate-50 font-semibold tracking-wide rounded-lg px-[.5em] py-[.25em] ml-6"
                    onClick={closeDialog}>
                    Close
                </button>
            </dialog>
        </AppContext.Provider>
    )
}