'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-4">
      <div className="card p-8 w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gradient">
          Sign In
        </h1>

        <form onSubmit={handleCredentials} className="flex flex-col gap-3">
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
            Iniciar sesión
          </button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-sm">o</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full bg-white border border-gray-200 py-2 rounded-lg hover:border-pink transition flex items-center justify-center gap-2"
          >
            <FaGoogle className="text-pink" />
            Continue with Google
          </button>
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full bg-ink text-white py-2 rounded-lg hover:bg-pink transition flex items-center justify-center gap-2"
          >
            <FaGithub />
            Continue with GitHub
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center mt-4">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-pink font-semibold hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
