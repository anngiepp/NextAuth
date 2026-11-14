'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signIn' })}
      className="bg-ink text-white py-2 px-4 rounded-lg hover:bg-pink transition"
    >
      Cerrar Sesión
    </button>
  );
}
