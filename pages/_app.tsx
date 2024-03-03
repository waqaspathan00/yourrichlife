import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ModalOpenProvider} from "@/lib/context/ModalOpenContext";
import {SavingsDataProvider} from "@/lib/context/SavingsDataContext";

export default function App({Component, pageProps}: AppProps) {
    return (
        <SavingsDataProvider>
            <ModalOpenProvider>
                <Component {...pageProps} />
            </ModalOpenProvider>
        </SavingsDataProvider>
    );
}
