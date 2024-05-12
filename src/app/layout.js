import Provider from "@/components/provider/Provider";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "../../public/assets/css/plugns.css";
import BootstrapClient from "../components/bootstrapClient";
import "./globals.css";
import Menu from "@/components/menu/Menu";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Taxar Real Estate",
  description: "Taxar Real Estate",
};
export const revalidate = 0;
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      {/* <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" /> */}
      <body>
        <>
          <Menu />
          {children}
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
          <BootstrapClient />
        </>
      </body>
    </html>
  );
}
