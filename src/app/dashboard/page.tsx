import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="card p-6">
          <h1 className="text-3xl font-bold mb-4 text-gradient">
            Dashboard
          </h1>

          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              Bienvenido, <span className="font-semibold text-pink">{session?.user?.name}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
