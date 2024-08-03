import React, {useContext, useEffect, useState} from "react";
import { useRouter } from "next/router";
import {auth, createUserDoc} from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ContinueWithGoogleButton } from "@/components/AuthButtons";
import toast from "react-hot-toast";
import Link from "next/link";
import { Input } from "@/components/common/Input";
import {UserContext} from "@/lib/context/UserContext";

export default function LandingSignInPage() {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (user){
            router.push("/goals")
        }
    }, [user]);

    const handleRegistration = async () => {
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            updateProfile(user, { displayName: name });
            createUserDoc(email);
            // toast.success(`Welcome ${name}`);
            await router.push("/goals");
        } catch (error) {
            console.log(error);
            toast.error("Unable to create an account.");
        }
    };

    return (
        <div className={"flex w-full flex-col items-center h-screen pt-8"}>
            <div className={"flex w-11/12 flex-col items-start space-y-2 rounded-2xl bg-white p-8 lg:w-1/3"}>
                <h2 className={"w-full text-center text-3xl font-bold"}>Register</h2>

                <ContinueWithGoogleButton router={router} />

                <span className={"w-full py-4 text-center"}>&mdash; or use your email to register &mdash;</span>

                <Input
                    label={"name"}
                    placeholder={"Enter your name"}
                    value={name}
                    handleChange={(e) => setName(e.target.value)}
                />
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

                <div className={"w-full pt-4"}>
                    <button
                        className={"w-full rounded-full bg-blue-500 p-4 text-white shadow-innerDarkBlue"}
                        onClick={handleRegistration}
                    >
                        Register
                    </button>
                </div>

                <p>
                    Already have an account?&nbsp;
                    <Link className={"font-bold text-blue"} href={"/signin"}>
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );
}
