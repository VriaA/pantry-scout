

import { AppContext } from "@/contexts/AppContext";
import { TAppContext } from "@/types/app";
import { db } from "@/firebase";
import { useContext, useEffect, useState } from "react";
import { collection, where, orderBy, query, onSnapshot, DocumentData, doc, deleteDoc, updateDoc } from "firebase/firestore";

type TUsePantry = {
    pantryItems: DocumentData[] | null;
    loading: boolean;
    deleteItem: (id: "string") => void;
    increaseQuantityByOne: (id: string, prevQuantity: number) => void;
    decreaseQuantityByOne: (id: string, prevQuantity: number) => void;
}

export default function usePantry(): TUsePantry {
    const { signedInUser, setDialog, openDialog } = useContext(AppContext) as TAppContext;
    const [pantryItems, setPantryItems] = useState<DocumentData[] | null>(null);
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

    function deleteItem(id: 'string') {
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

    return { pantryItems, loading, deleteItem, increaseQuantityByOne, decreaseQuantityByOne }
}