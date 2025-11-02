import { Cormorant_Garamond, Quattrocento_Sans } from "next/font/google";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";
import SessionWrapper from "@/components/SessionWrapper";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorantGaramond",
  subsets: ["latin"],
});

const quattrocentoSans = Quattrocento_Sans({
  variable: "--font-quattrocentoSans",
  subsets: ["latin"],
  weight: ['400', '700'],
  display: "swap"
});

export const metadata = {
  title: {
    default: "Hot Coffee Hub",
    template: "%s | Hot Coffee Hub",
  },
  description: "Your daily dose of handcrafted coffee",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en"
      crosspilot='true'>
      {/* <ReactLenis root> */}
      <SessionWrapper>
        <body
          className={`${cormorantGaramond.variable} ${quattrocentoSans.variable} antialiased`}>
          <LenisWrapper>
            {children}
          </LenisWrapper>
        </body>
      </SessionWrapper>
      {/* </ReactLenis> */}
    </html>
  );
}
