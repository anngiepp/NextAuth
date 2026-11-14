import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import Provider from "@/components/SessionProvider";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "My Next Auth App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className={`${archivo.variable} font-sans antialiased`}>
        <nav className="w-full bg-white/60 backdrop-blur-md shadow-sm">
          <div className="mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gradient">
              MyAuthApp
            </Link>
            <ul className="flex items-center justify-center gap-6 text-sm font-medium">
              <li>
                <Link href="/dashboard" className="hover:text-pink">
                  Dashboard
                </Link>
              </li>
              {session?.user && (
                <li>
                  <Link href="/profile" className="hover:text-pink">
                    Profile
                  </Link>
                </li>
              )}
              {session?.user && (
                <li>
                  <LogoutButton />
                </li>
              )}
              {session?.user?.image && (
                <li>
                  <Image
                    height={100}
                    width={100}
                    src={session.user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full ring-2 ring-pink"
                  />
                </li>
              )}
            </ul>
          </div>
        </nav>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
