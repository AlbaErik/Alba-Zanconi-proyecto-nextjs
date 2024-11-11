import "./globals.css";
import { AppWrapper } from "./context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="Tienda virtual de tecnologia"></meta>
        <title>ESky Tienda Virtual</title>
      </head>
      <body className="min-h-screen pt-[1%]">
        <AppWrapper>
            {children}
        </AppWrapper>  
      </body>
    </html>
  );
}
