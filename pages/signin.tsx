import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { ContinueWithGoogleButton } from "@/components/AuthButtons";
import { sendPasswordResetEmail, signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { Input } from "@/components/common/Input";
import Link from "next/link";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignIn = async () => {
        const isValidEmailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }
        if (!isValidEmailRE.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        if (!password) {
            toast.error("Please enter your password");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Signed in
            const user = userCredential.user;
            toast.success(`Welcome ${user?.displayName}`);
            router.push("/");
        } catch (error: AuthError | any) {
            switch (error.code) {
                case "auth/user-not-found":
                    toast.error("User not found");
                    break;
                case "auth/wrong-password":
                    toast.error("Wrong password");
                    break;
                default:
                    console.log(error);
                    toast.error("Unable to sign in");
                    break;
            }
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        const toastIdLoading = toast.loading("Sending email...");
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Email sent", { id: toastIdLoading });
        } catch (error: AuthError | any) {
            console.log(error);
            toast.error("Unable to send email", { id: toastIdLoading });
        }
    };

    return (
        <div className={"flex w-full flex-col items-center h-screen pt-8"}>
            <div className={"flex w-11/12 flex-col items-start space-y-2 rounded-2xl bg-white p-8 lg:w-1/3"}>
                <h2 className={"w-full text-center text-3xl font-bold"}>Sign In</h2>

                <ContinueWithGoogleButton router={router} />

                <span className={"w-full py-4 text-center"}>
                    &mdash;&nbsp;or use your email to sign in&nbsp;&mdash;
                </span>

                <Input
                    type={"email"}
                    label={"email"}
                    placeholder={"Enter your email"}
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type={"password"}
                    label={"password"}
                    placeholder={"Enter your password"}
                    value={password}
                    handleChange={(e) => setPassword(e.target.value)}
                />

                <div className={"cursor-pointer py-4 text-lg font-bold text-blue"} onClick={handleForgotPassword}>
                    Forgot password?
                </div>

                <button
                    className={"my-4 w-full rounded-full bg-blue-500 p-4 text-white shadow-innerDarkBlue"}
                    onClick={handleSignIn}
                >
                    Sign In
                </button>

                <p>
                    Don't have an account?&nbsp;
                    <Link className={"font-bold text-blue"} href={"/"}>
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
