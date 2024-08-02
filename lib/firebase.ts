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

export const createUserDoc = async (userEmail: string | null | undefined) => {
    if (!userEmail) return
    const userDocRef = doc(db, "savings", userEmail);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        return;
    }
    const userDocData = {
        accounts: [{balance: 0, color: "bg-blue-800", name: "main"}],
        completedGoals: [],
        dailySavingsBalance: Array.from({length: 365}, (_, i) => {
            // create a date that was 1 year ago
            const date = new Date();
            date.setDate(date.getDate() - (365 - i));
            return {amount: 0, date: date.toLocaleDateString()};
        }),
        savingsGoals: []
    }
    await setDoc(userDocRef, userDocData);
}

export const getSavingsData = async (userEmail: string | null | undefined) => {
    if (!userEmail) return
    const savingsDocRef = doc(db, "savings", userEmail);
    const savingsDoc = await getDoc(savingsDocRef);
    return savingsDoc.data();
}

export const updateSavingsDoc = async (userEmail: string | null | undefined, newData: any) => {
    if (!userEmail) return
    try {
        const savingsDocRef = doc(db, "savings", userEmail);
        await updateDoc(savingsDocRef, newData);
    } catch (err) {
        console.log(err);
        throw new Error("Error saving data to DB");
    }
}

export const getAccountsData = async (userEmail: string) => {
    const accountsDocRef = doc(db, "savings", userEmail, "accounts");
    const accountsDoc = await getDoc(accountsDocRef);
    return accountsDoc.data();
}

/** this current db storage method is not ideal because it will be difficult to query the data */
// we need to refactor this so we can get the account data for all accounts e
export const updateAccountsCollection = async (accountName: string, balance: number, userEmail: string) => {
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
    await updateSavingsDoc(userEmail, {accountNames: newAccountNames});

    const newAccountDocRef = doc(db, "savings", "wadia", "accounts", accountName);
    await setDoc(newAccountDocRef, newAccount);
    // return newAccounts;
}

export const setAccountsCollectionExample = async (userEmail: string) => {
    const savingsData = await getSavingsData(userEmail);
    if (!savingsData) {
        throw new Error("No data found");
    }
    const dailySavingsBalance = savingsData.dailySavingsBalance;
    const newAccountDocRef = doc(db, "savings", userEmail, "accounts", "chase");
    await setDoc(newAccountDocRef, {
        dailySavingsBalance: dailySavingsBalance
    });
}

export const completeGoal = async (savingsGoals: Goal[], completedGoals: Goal[], id: number, userEmail: string | null | undefined) => {
    const completedGoal = savingsGoals.find((goal: Goal) => goal.id === id)
    if (!completedGoal) {
        throw new Error("Goal not found");
    }
    completedGoal.completed = true;
    const newSavingsGoals = savingsGoals.filter((goal: Goal) => goal.id !== id);
    const newCompletedGoals = [...completedGoals, completedGoal];
    await updateSavingsDoc(userEmail, {savingsGoals: newSavingsGoals, completedGoals: newCompletedGoals});
    return {savingsGoals: newSavingsGoals, completedGoals: newCompletedGoals};
}

export const deleteGoal = async (goals: Goal[], id: number, type: string, userEmail: string) => {
    const typeKey = type === "completed" ? "completedGoals" : "savingsGoals";
    const newGoals = goals.filter((goal: Goal) => goal.id !== id);
    await updateSavingsDoc(userEmail, {[typeKey]: newGoals});
    return newGoals;
}