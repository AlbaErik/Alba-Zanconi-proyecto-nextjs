import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
      <div className="flex justify-center">
        <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/logo.png"
                alt="Logo"
                width={300}
                height={50}
                priority
          />
      </div>
        {children}
      </body>
    </html>
  );
}
