import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./com/Header";
import Footer from "./com/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Home page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header/>
        {children}
        <Footer/>
        </body>
       
    </html>
  );
}
