import {initializeApp} from "firebase/app";
import {collection, getFirestore, setDoc} from "firebase/firestore";
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

export const getSavingsData = async () => {
    const savingsDocRef = doc(db, "savings", "wadia");
    const savingsDoc = await getDoc(savingsDocRef);
    return savingsDoc.data();
}

export const updateSavingsDoc = async (newData: any) => {
    try {
        const savingsDocRef = doc(db, "savings", "wadia");
        await updateDoc(savingsDocRef, newData);
    } catch (err) {
        console.log(err);
        throw new Error("Error saving data to DB");
    }
}

export const getAccountsData = async () => {
    const accountsDocRef = doc(db, "savings", "wadia", "accounts");
    const accountsDoc = await getDoc(accountsDocRef);
    return accountsDoc.data();
}

/** this current db storage method is not ideal because it will be difficult to query the data */
// we need to refactor this so we can get the account data for all accounts e
export const updateAccountsCollection = async (accountName: string, balance: number) => {
    const savingsDocRef = doc(db, "savings", "wadia");
    const savingsDoc = await getDoc(savingsDocRef);
    const data = savingsDoc.data();
    if (!data) {
        throw new Error("No data found");
    }

    const accountNames = data.accountNames;
    const newAccountNames = [...accountNames, accountName];
    const newAccount = {
        name: accountName,
        dailySavingsBalance: [balance],
    }
    await updateSavingsDoc({accountNames: newAccountNames});

    const newAccountDocRef = doc(db, "savings", "wadia", "accounts", accountName);
    await setDoc(newAccountDocRef, newAccount);
    // return newAccounts;
}

export const setAccountsCollectionExample = async () => {
    const savingsData = await getSavingsData();
    if (!savingsData) {
        throw new Error("No data found");
    }
    const dailySavingsBalance = savingsData.dailySavingsBalance;
    const newAccountDocRef = doc(db, "savings", "wadia", "accounts", "chase");
    await setDoc(newAccountDocRef, {
        dailySavingsBalance: dailySavingsBalance
    });
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

export const deleteGoal = async (goals: Goal[], id: number, type: string) => {
    const typeKey = type === "completed" ? "completedGoals" : "savingsGoals";
    const newGoals = goals.filter((goal: Goal) => goal.id !== id);
    await updateSavingsDoc({[typeKey]: newGoals});
    return newGoals;
}