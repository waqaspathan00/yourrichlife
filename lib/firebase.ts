import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {signOut} from "@firebase/auth";
import toast from "react-hot-toast";
import {NextRouter} from "next/router";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string);

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const handleSignOut = (router: NextRouter) => {
    signOut(auth).then(() => {
        toast.success("Signed out");
        // window.close();
        router.push("/");
    });
};
