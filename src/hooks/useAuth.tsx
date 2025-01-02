"use client"

import { FormEvent, useState, useContext } from "react";
import { auth, db } from "@/libs/firebase"
import { deleteDoc, doc } from "firebase/firestore";
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    reauthenticateWithCredential,
    deleteUser,
    AuthCredential,
    EmailAuthProvider,
    reauthenticateWithPopup,
    UserCredential,
} from "firebase/auth";
import { UseAuthValues, NewUser, AuthErrorObject } from "@/types/auth";

import { usePathname, useRouter } from 'next/navigation'
import { AppContext } from "@/contexts/AppContext";
import { TAppContext } from "@/types/app"
import { PantryContext, TPantryContext } from "@/contexts/PantryContext"



export function useAuth(): UseAuthValues {
    const provider = new GoogleAuthProvider();
    const pathname = usePathname();
    const isSignIn = pathname === "/sign-in";
    const isSignUp = pathname === "/sign-up";
    const isDeleteAccount = pathname === "/delete-account";
    const router = useRouter();
    const [newUser, setNewUser] = useState<NewUser>({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [authError, setAuthError] = useState<AuthErrorObject>(() => ({
        isMessageShown: false,
        message: null,
    }));

    const { setDialog, openDialog } = useContext(AppContext) as TAppContext;
    const { pantryItems, setPantryItems, setItemsToRender } = useContext(PantryContext) as TPantryContext
    const [loading, setLoading] = useState<boolean>(false)

    function updateUserDataOnChange(e: FormEvent): void {
        const input = e.target as HTMLFormElement;
        const key: string = input.name;
        const value: string = input.value;

        setNewUser((prevUser) => ({ ...prevUser, [key]: value }));
    }

    async function authenticateWithEmailAndPassword(e: FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const { email, password, confirmPassword } = newUser;
        const hasNumber = /\d/.test(password)

        if (isSignUp && password !== confirmPassword) {
            showErrorMessage(`Passwords do not match.`);
        } else if (isSignUp && password.split('').length < 8) {
            showErrorMessage(`Password must be at least 8 characters long.`);
        } else if (isSignUp && !hasNumber) {
            showErrorMessage(`Password must contain a number.`);
        } else {
            setLoading(true);
            if (isSignIn) {
                await signIn(email, password, form);
            } else if (isSignUp) {
                await createAccount(email, password, form);
            } else {
                const credential = EmailAuthProvider.credential(email, password);
                await deleteAccount(auth.currentUser as User, "emailAndPassword", credential);
            }
        }
    }

    async function signIn(
        email: string,
        password: string,
        form: HTMLFormElement,
    ) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            if (userCredential) {
                clearUserDetails(form);
                setLoading(() => false);
                router.replace("/");
            }
        } catch (error: any) {
            setLoading(() => false);
            showErrorMessage(error.message);
        }
    }

    async function authenticateWithGoogle() {
        try {
            setLoading(() => true);
            if (isDeleteAccount) {
                await deleteAccount(auth.currentUser as User, "google");
            } else {
                const userCredential = await signInWithPopup(auth, provider);
                if (userCredential) {
                    setLoading(() => false);
                    !isDeleteAccount && router.replace("/")
                }
            }
        } catch (error: any) {
            setLoading(() => false);
            setDialog((prevDialog) => ({ ...prevDialog, message: error.message }));
            openDialog();
        }
    }

    async function deleteAccount(
        user: User,
        method: string,
        credential?: AuthCredential,
    ) {
        try {
            let userCredential: UserCredential;
            if (method === "emailAndPassword") {
                userCredential = await reauthenticateWithCredential(
                    user,
                    credential as AuthCredential,
                );
            } else {
                userCredential = await reauthenticateWithPopup(user, provider);
            }
            if (userCredential) {
                await deleteUserPantryDate()
                await deleteUser(user);
                setDialog((prevDialog) => ({
                    ...prevDialog,
                    message: `Account deleted successfully.`,
                }));
                openDialog();
                setLoading(() => false);
                router.replace("/")
            }
        } catch (error: any) {
            setDialog((prevDialog) => ({ ...prevDialog, message: error.message }));
            openDialog();
            setLoading(() => false);
        }
    }

    async function deleteUserPantryDate() {
        if (!pantryItems) return;
        const promises = pantryItems.map( (item) =>
            deleteDoc(doc(db, "pantry", item.docId)),
        );
        setPantryItems(() => []);
        setItemsToRender(() => []);
        await Promise.all(promises);
    }

    async function createAccount(
        email: string,
        password: string,
        form: HTMLFormElement,
    ) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            if (userCredential) {
                clearUserDetails(form);
                setLoading(() => false);
                router.push("/");
            }
        } catch (error: any) {
            showErrorMessage(error.message);
        } finally {
            setLoading(() => false);
        }
    }

    function clearUserDetails(form: HTMLFormElement): void {
        setNewUser((prevUser): NewUser => {
            prevUser = { email: "", password: "", confirmPassword: "" };
            return prevUser;
        });
        form.reset();
    }

    function showErrorMessage(message: string) {
        setAuthError((prev) => ({
            ...prev,
            isMessageShown: true,
            message: message,
        }));
        setTimeout(
            () =>
                setAuthError((prev) => ({
                    ...prev,
                    isMessageShown: false,
                    message: null,
                })),
            6000,
        );
    }

    return { isDeleteAccount, isSignIn, isSignUp, newUser, authError, loading, updateUserDataOnChange, authenticateWithGoogle, authenticateWithEmailAndPassword }
}