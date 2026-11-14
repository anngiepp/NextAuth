import fs from "fs";
import path from "path";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  attempts: number;
  lockUntil: number;
};

// en Vercel solo se puede escribir en /tmp
const file = process.env.VERCEL
  ? "/tmp/users.json"
  : path.join(process.cwd(), "data", "users.json");

export function getUsers(): User[] {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function saveUsers(users: User[]) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(users, null, 2));
}
