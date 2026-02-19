import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Price Drop",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
