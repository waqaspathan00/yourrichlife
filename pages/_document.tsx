import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href={"/manifest.json"}/>
                <link rel="manifest" href={"/.well-known/apple-developer-merchantid-domain-association"}/>
                <link rel={"apple-touch-icon"} href={"/img/icons/180.png"}></link>
                <link rel="shortcut icon" type="image/jpg" href="/img/icons/180.png"/>
                <meta name="theme-color" content="#2563EB"/>

                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Quicksand:wght@300..700&display=swap"
                    rel="stylesheet"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
