"use client"

import { useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Box } from "@mui/material";

export default function Auth(): JSX.Element {
    const { newUser, isSignIn, isSignUp, isDeleteAccount, authError, loading, updateUserDataOnChange, authenticateWithGoogle, authenticateWithEmailAndPassword } = useAuth()
    const formRef = useRef<HTMLFormElement | null>(null);
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null);
    const isBothFilled: boolean =
        newUser.password.trim().split("").length > 0 &&
        newUser.confirmPassword.trim().split("").length > 0;
    const isMatch: boolean = newUser.password === newUser.confirmPassword;
    const PASSWORD_INPUT_BORDER_CLASS =
        isBothFilled && isMatch
            ? "border-green-600"
            : isBothFilled && !isMatch
                ? "border-red-700"
                : "border-zinc-300";

    return (
        <Box className="flex justify-center items-center h-[100svh] max-w-[1536px]">
            <Box className="flex flex-col items-center justify-center w-full md:w-1/2 h-full">
                <section className="flex flex-col items-center w-full px-10 md:px-0 md:w-[70%]">
                    <h1 className="self-center text-[52px] md:text-6xl lg:text-8xl text-zinc-950 font-melodrama font-semibold !leading-none text-center">
                        {isDeleteAccount
                            ? "Sad to see you go!"
                            : `Welcome!`}
                    </h1>
                    <p className="self-center font-manrope font-medium mt-2 mb-8 text-lg md:text-xl text-zinc-800 text-center">
                        {isSignIn
                            ? "Sign in to manage your pantry."
                            : isDeleteAccount
                                ? "Confirm account ownership before deleting."
                                : "Sign up to manage your pantry."}
                    </p>
                    <form
                        className="flex-none w-full"
                        onSubmit={authenticateWithEmailAndPassword}
                        ref={formRef}>
                        <fieldset className="relative flex flex-col gap-6 w-full">
                            <input
                                className="box-border h-10 leading-none p-2 text-base md:text-lg text-zinc-800 font-manrope outline-none border border-zinc-900 rounded-lg placeholder:text-zinc-800 bg-transparent"
                                type="text"
                                placeholder="Email address"
                                name="email"
                                onChange={updateUserDataOnChange}
                                ref={emailInputRef}
                                required
                            />
                            <input
                                className={`${PASSWORD_INPUT_BORDER_CLASS} box-border h-10 leading-none p-2 text-base md:text-lg text-zinc-800 font-manrope outline-none border border-zinc-900 rounded-lg placeholder:text-zinc-800 bg-transparent`}
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={updateUserDataOnChange}
                                ref={passwordInputRef}
                                required
                                autoComplete="true"
                            />
                            {isSignUp && (
                                <input
                                    className={`${PASSWORD_INPUT_BORDER_CLASS} box-border h-10 leading-none p-2 text-base md:text-lg text-zinc-800 font-manrope outline-none border border-zinc-900 rounded-lg placeholder:text-zinc-800 bg-transparent `}
                                    type="password"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    onChange={updateUserDataOnChange}
                                    ref={confirmPasswordInputRef}
                                    required
                                    autoComplete="false"
                                />
                            )}

                            {authError.isMessageShown && (
                                <p className="absolute z-10 self-center top-[110%] px-2 py-1 text-sm text-slate-100 font-medium bg-zinc-900 rounded-lg">
                                    <span className="relative flex items-center gap-1 before:absolute before:top-[-22px] before:left-0 before:block before:border-x-transparent before:border-x-[10px] before:border-t-transparent before:border-t-[10px] before:border-b-[12px] before:border-b-zinc-900 before:z-[9]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#dc2626"
                                        >
                                            <path d="M479.93-274.02q16.46 0 27.4-10.74 10.93-10.75 10.93-27.21t-10.86-27.52q-10.86-11.05-27.33-11.05-16.46 0-27.4 11.03-10.93 11.04-10.93 27.5 0 16.47 10.86 27.23 10.86 10.76 27.33 10.76Zm-31-158.74h68.14v-257.07h-68.14v257.07ZM480.3-74.02q-84.2 0-158.04-31.88-73.84-31.88-129.16-87.2-55.32-55.32-87.2-129.2-31.88-73.88-31.88-158.17 0-84.28 31.88-158.2 31.88-73.91 87.16-128.74 55.28-54.84 129.18-86.82 73.9-31.99 158.21-31.99 84.3 0 158.25 31.97 73.94 31.97 128.75 86.77 54.82 54.8 86.79 128.88 31.98 74.08 31.98 158.33 0 84.24-31.99 158.07-31.98 73.84-86.82 128.95-54.83 55.1-128.87 87.17Q564.5-74.02 480.3-74.02Zm.2-68.13q140.54 0 238.95-98.75 98.4-98.76 98.4-239.6 0-140.54-98.22-238.95-98.21-98.4-239.75-98.4-140.16 0-238.95 98.22-98.78 98.21-98.78 239.75 0 140.16 98.75 238.95 98.76 98.78 239.6 98.78ZM480-480Z" />
                                        </svg>
                                        <span>{authError.message}</span>
                                    </span>
                                </p>
                            )}
                        </fieldset>
                        <button
                            className={`${loading ? "cursor-not-allowed" : ""} grid place-content-center box-border h-12 w-full mt-10 py-2 bg-cta-primary hover:animate-cta-gradient text-zinc-900 font-manrope text-base md:text-lg !leading-none font-bold rounded-lg transition-transform duration-300 active:translate-y-1`}
                            disabled={loading ? true : false}>
                            {loading ? (
                                <svg
                                    aria-label="Loading..."
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="xMidYMid"
                                    width="32"
                                    height="32"
                                    style={{
                                        shapeRendering: "auto",
                                        display: "block",
                                        background: "transparent",
                                    }}
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <g>
                                        <circle
                                            strokeDasharray="164.93361431346415 56.97787143782138"
                                            r="35"
                                            strokeWidth="10"
                                            stroke="#000000"
                                            fill="none"
                                            cy="50"
                                            cx="50"
                                        >
                                            <animateTransform
                                                keyTimes="0;1"
                                                values="0 50 50;360 50 50"
                                                dur="1s"
                                                repeatCount="indefinite"
                                                type="rotate"
                                                attributeName="transform"
                                            ></animateTransform>
                                        </circle>
                                        <g></g>
                                    </g>
                                </svg>
                            ) : isSignIn ? (
                                "Sign in"
                            ) : isDeleteAccount ? (
                                "Confirm"
                            ) : (
                                "Create account"
                            )}
                        </button>
                    </form>
                    {!isDeleteAccount && (
                        <p className="text-sm font-medium font-manrope mt-8 self-center text-zinc-800">
                            {isSignIn ? "New here?" : "Already have an account?"}&nbsp;
                            <Link
                                href={`${isSignIn ? "/sign-up" : "/sign-in"}`}
                                replace={true}
                                className="text-orange-primary text-medium font-bold hover:underline hover:underline-offset-2">
                                {isSignIn ? "Sign up" : "Sign in"}
                            </Link>
                        </p>
                    )}

                    <p className="flex items-center justify-center gap-2 w-full overflow-hidden h-fit my-5 p-0 text-base font-manrope font-normal text-zinc-500 leading-none before:block before:flex-none before:w-full before:mt-[1%] before:h-[1px] before:bg-zinc-400  after:block after:flex-none after:w-full after:mt-[1%] after:h-[1px] after:bg-zinc-400">
                        or
                    </p>
                    <button
                        className={`${loading ? "cursor-not-allowed" : ""} flex gap-2 items-center text-sm font-manrope font-medium text-zinc-800 hover:underline hover:underline-offset-2`}
                        onClick={authenticateWithGoogle}
                        disabled={loading ? true : false}
                    >
                        <svg
                            aria-label="Google logo"
                            width="24"
                            height="24"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M23.9996 19.6363V28.9309H36.916C36.3488 31.9199 34.6468 34.4509 32.0941 36.1527L39.8831 42.1964C44.4213 38.0075 47.0395 31.8547 47.0395 24.5456C47.0395 22.8438 46.8868 21.2073 46.6031 19.6366L23.9996 19.6363Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M10.5494 28.568L8.79263 29.9128L2.57434 34.7564C6.52342 42.589 14.6174 48 23.9991 48C30.4789 48 35.9116 45.8618 39.8826 42.1964L32.0936 36.1528C29.9554 37.5927 27.2281 38.4656 23.9991 38.4656C17.7591 38.4656 12.4575 34.2547 10.5592 28.5819L10.5494 28.568Z"
                                fill="#34A853"
                            />
                            <path
                                d="M2.57436 13.2436C0.938084 16.4726 0 20.1163 0 23.9999C0 27.8834 0.938084 31.5271 2.57436 34.7561C2.57436 34.7777 10.5599 28.5597 10.5599 28.5597C10.08 27.1197 9.79624 25.5925 9.79624 23.9996C9.79624 22.4067 10.08 20.8795 10.5599 19.4395L2.57436 13.2436Z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M23.9996 9.55636C27.5342 9.55636 30.676 10.7781 33.1851 13.1345L40.0577 6.2619C35.8904 2.37833 30.4797 0 23.9996 0C14.6179 0 6.52342 5.38908 2.57434 13.2437L10.5597 19.44C12.4578 13.7672 17.7596 9.55636 23.9996 9.55636Z"
                                fill="#EA4335"
                            />
                        </svg>
                        Continue with google
                    </button>
                </section>
            </Box>

            <Box className="hidden md:block md:w-1/2 h-full bg-[url(../assets/fruits.webp)] bg-cover bg-left bg-no-repeat border-l border-zinc-600"></Box>
        </Box>
    );
}