"use client"
import { AppContext } from "@/contexts/AppContext";
import { TAppContext } from "@/types/app";
import { db } from "@/firebase";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { collection, where, orderBy, query, onSnapshot, DocumentData, doc, addDoc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export type TPantryContext = {
    itemsToRender: DocumentData[] | null;
    setItemsToRender: React.Dispatch<React.SetStateAction<DocumentData[] | null>>;
    pantryItems: DocumentData[] | null;
    loading: boolean;
    addItem: (newItem: FormDataEntryValue) => void;
    deleteItem: (id: "string") => void;
    increaseQuantityByOne: (id: string, prevQuantity: number) => void;
    decreaseQuantityByOne: (id: string, prevQuantity: number) => void;
}

export const PantryContext = createContext<TPantryContext | null>(null)

export default function PantryContextProvider({ children }: { children: ReactNode }): JSX.Element {
    const { signedInUser, setDialog, openDialog } = useContext(AppContext) as TAppContext;
    const [pantryItems, setPantryItems] = useState<DocumentData[] | null>(null);
    const [itemsToRender, setItemsToRender] = useState<DocumentData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!signedInUser) return;

        const q = query(
            collection(db, "pantry"),
            where("userId", "==", signedInUser.uid),
            orderBy("timestamp", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                let items: DocumentData[] = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    docId: doc.id,
                }));
                setPantryItems(items);
                setItemsToRender(items);
            } catch {
                setDialog((prev) => ({
                    ...prev,
                    message: "An error occurred, please refresh the page.",
                }));
                openDialog();
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [signedInUser, setDialog, openDialog]);

    function addItem(newItem: FormDataEntryValue) {
        addDoc(collection(db, "pantry"), {
            name: newItem,
            quantity: 1,
            userId: signedInUser?.uid,
            timestamp: serverTimestamp()
        })
    }

    function deleteItem(id: string) {
        setLoading(() => true)
        try {
            deleteDoc(doc(db, "pantry", id))
        } catch (error: any) {
            setDialog((prev) => ({ ...prev, message: error.message }))
            openDialog()
        } finally {
            setLoading(() => false)
        }
    }

    function increaseQuantityByOne(id: string, prevQuantity: number) {
        setLoading(() => true)
        try {
            updateDoc(doc(db, "pantry", id), {
                quantity: prevQuantity += 1
            })
        } catch (error: any) {
            setDialog((prev) => ({ ...prev, message: error.message }))
            openDialog()
        } finally {
            setLoading(() => false)
        }
    }

    function decreaseQuantityByOne(id: string, prevQuantity: number) {
        setLoading(() => true)
        try {
            if (prevQuantity > 1) {
                updateDoc(doc(db, "pantry", id), {
                    quantity: prevQuantity -= 1
                })
            } else {
                deleteDoc(doc(db, "pantry", id))
            }
        } catch (error: any) {
            setDialog((prev) => ({ ...prev, message: error.message }))
            openDialog()
        } finally {
            setLoading(() => false)
        }
    }

    const PantryContextValues = { itemsToRender, setItemsToRender, pantryItems, loading, addItem, deleteItem, increaseQuantityByOne, decreaseQuantityByOne }

    return (
        <PantryContext.Provider value={PantryContextValues}>
            {children}
        </PantryContext.Provider>
    )
}
