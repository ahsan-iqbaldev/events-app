import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Providers from "@/store/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </main>
      <Footer />
    </div>
  );
}
