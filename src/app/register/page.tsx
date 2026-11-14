'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push('/signIn');
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-4">
      <div className="card p-8 w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gradient">
          Registro
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

          {error && <p className="text-pink text-sm font-medium">{error}</p>}

          <button type="submit" className="btn-gradient w-full py-2 rounded-lg font-semibold">
            Crear cuenta
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <Link href="/signIn" className="text-pink font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
