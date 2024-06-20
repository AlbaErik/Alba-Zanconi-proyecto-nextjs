import "./globals.css";
import { AppWrapper } from "./context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen pt-[1%]">
        <AppWrapper>
          {children}
        </AppWrapper>  
      </body>
    </html>
  );
}
