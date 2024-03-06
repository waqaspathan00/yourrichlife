import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ModalOpenProvider} from "@/lib/context/ModalOpenContext";
import {SavingsDataProvider} from "@/lib/context/SavingsDataContext";
import {Toaster} from "react-hot-toast";

export default function App({Component, pageProps}: AppProps) {
    return (
        <SavingsDataProvider>
            <ModalOpenProvider>
                <Toaster/>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />

                <Component {...pageProps} />
            </ModalOpenProvider>
        </SavingsDataProvider>
    );
}
