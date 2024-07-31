import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export function useUserData(): any {
    const [user] = useAuthState(auth);

    return { user };
}
