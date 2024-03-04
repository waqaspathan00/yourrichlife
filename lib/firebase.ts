import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {signOut} from "@firebase/auth";
import toast from "react-hot-toast";
import {NextRouter} from "next/router";
import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {Goal} from "@/lib/types";

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

export const updateSavingsDoc = async (newData: any) => {
    try {
        const savingsDocRef = doc(db, "savings", "wadia");
        await updateDoc(savingsDocRef, newData);
    } catch (err) {
        console.log(err);
        throw new Error("Error saving data to DB");
    }
}

export const getSavingsData = async () => {
    const savingsDocRef = doc(db, "savings", "wadia");
    const savingsDoc = await getDoc(savingsDocRef);
    return savingsDoc.data();
}

export const completeGoal = async (savingsGoals: Goal[], completedGoals: Goal[], id: number) => {
    const completedGoal = savingsGoals.find((goal: Goal) => goal.id === id)
    if (!completedGoal) {
        throw new Error("Goal not found");
    }
    completedGoal.completed = true;
    const newSavingsGoals = savingsGoals.filter((goal: Goal) => goal.id !== id);
    const newCompletedGoals = [...completedGoals, completedGoal];
    await updateSavingsDoc({savingsGoals: newSavingsGoals, completedGoals: newCompletedGoals});
    return {savingsGoals: newSavingsGoals, completedGoals: newCompletedGoals};
}

export const deleteGoal = async (savingsGoals: Goal[], id: number) => {
    const newGoals = savingsGoals.filter((goal: Goal) => goal.id !== id);
    await updateSavingsDoc({savingsGoals: newGoals});
    return newGoals;
}