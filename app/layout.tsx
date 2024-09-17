import "./globals.css";
import Navbar from "@/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-5xl mx-auto py-4 flex gap-x-4 ">{children}</main>
      </body>
    </html>
  );
}
