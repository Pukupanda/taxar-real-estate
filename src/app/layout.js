import "../../public/assets/css/plugns.css";
import "./globals.css";
import Script from "next/script";
import Provider from "@/components/provider/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocketProvider from "@/components/provider/SocketProvider";

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
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" />
      {/* <Script src="https://js.pusher.com/8.2.0/pusher.min.js" /> */}
      <body>
        <SocketProvider>
          <Provider>{children}</Provider>
          <ToastContainer position="top-left" autoClose={3000} />
        </SocketProvider>
      </body>
    </html>
  );
}
