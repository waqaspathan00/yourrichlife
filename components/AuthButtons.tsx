/**
 * Shown when the user is NOT logged in
 */
import { FC, PropsWithChildren } from "react";
import { NextRouter } from "next/router";
import {auth, createUserDoc, googleAuthProvider} from "../lib/firebase";
import toast from "react-hot-toast";
import { signInWithPopup, signOut } from "@firebase/auth";

type AuthButtonProps = PropsWithChildren<{
    router: NextRouter;
}>;

export const ContinueWithGoogleButton = ({ router }: AuthButtonProps) => {
    const signInWithGoogle = async () => {
        signInWithPopup(auth, googleAuthProvider).then((data) => {
            createUserDoc(data.user?.email);
            // toast.success(`Welcome ${data.user?.displayName}`);
        });
        router.push("/");
    };

    return (
        <button
            className={
                "btn-google flex h-16 w-full items-center justify-center space-x-2 rounded-full border-2 border-grey-200 bg-white px-8"
            }
            onClick={signInWithGoogle}
        >
            <img src={"/img/google.png"} className={"w-8"} alt={"google logo"} />
            <span className={"text-sm font-bold text-black lg:text-lg"}>Continue with Google</span>
        </button>
    );
};

/**
 * Shown when the user is logged in
 */
export const SignOutButton = ({ router }: AuthButtonProps) => {
    const handleSignOut = () => {
        signOut(auth).then(() => {
            toast.success("Signed out");
            router.push("/");
        });
    };

    return (
        <button
            className={"w-32 rounded-full bg-blue py-2 text-lg text-white shadow-innerDarkBlue"}
            onClick={handleSignOut}
        >
            Sign Out
        </button>
    );
};
