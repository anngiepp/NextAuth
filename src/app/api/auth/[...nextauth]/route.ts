import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUsers, saveUsers } from "@/lib/users";

const MAX_ATTEMPTS = 3;
const LOCK_TIME = 5 * 60 * 1000; // 5 minutos

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Completa todos los campos");
        }

        const users = getUsers();
        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          throw new Error("Correo o contraseña incorrectos");
        }

        if (user.lockUntil > Date.now()) {
          const min = Math.ceil((user.lockUntil - Date.now()) / 60000);
          throw new Error(`Cuenta bloqueada, intenta de nuevo en ${min} min`);
        }

        const ok = await bcrypt.compare(credentials.password, user.password);

        if (!ok) {
          user.attempts++;

          if (user.attempts >= MAX_ATTEMPTS) {
            user.attempts = 0;
            user.lockUntil = Date.now() + LOCK_TIME;
            saveUsers(users);
            throw new Error("Demasiados intentos, cuenta bloqueada por 5 min");
          }

          saveUsers(users);
          throw new Error(
            `Contraseña incorrecta, te quedan ${MAX_ATTEMPTS - user.attempts} intentos`
          );
        }

        user.attempts = 0;
        user.lockUntil = 0;
        saveUsers(users);

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signIn",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
