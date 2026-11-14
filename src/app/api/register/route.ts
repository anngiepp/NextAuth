import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUsers, saveUsers } from "@/lib/users";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Completa todos los campos" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 6 caracteres" },
      { status: 400 }
    );
  }

  const users = getUsers();

  if (users.find((u) => u.email === email)) {
    return NextResponse.json({ error: "Ese correo ya está registrado" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);

  users.push({
    id: Date.now().toString(),
    name,
    email,
    password: hashed,
    attempts: 0,
    lockUntil: 0,
  });
  saveUsers(users);

  return NextResponse.json({ message: "Usuario registrado" }, { status: 201 });
}
