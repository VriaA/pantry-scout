import { FormEvent } from "react";

export type NewUser = {
    email: string;
    password: string;
    confirmPassword: string;
};

export type AuthErrorObject = {
    isMessageShown: boolean;
    message: string | null;
};

export type UseAuthValues = {
    isDeleteAccount: boolean;
    isSignIn: boolean;
    isSignUp: boolean;
    newUser: NewUser;
    authError: AuthErrorObject;
    loading: boolean;
    updateUserDataOnChange: (e: FormEvent) => void;
    authenticateWithGoogle: () => Promise<any>
    authenticateWithEmailAndPassword: (e: FormEvent) => void;
}