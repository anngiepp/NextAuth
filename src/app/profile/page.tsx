import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="card p-6">
          <h1 className="text-3xl font-bold mb-4 text-gradient">
            Profile
          </h1>

          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              Name: <span className="font-semibold">{session?.user?.name}</span>
            </p>
            <p className="text-gray-700 mb-2">
              Email: <span className="font-semibold">{session?.user?.email}</span>
            </p>
            {session?.user?.image && (
              <>
                <p className="text-gray-700 mb-2">
                  Image Profile:
                </p>
                <Image
                  height={100}
                  width={100}
                  src={session.user.image}
                  alt="Profile"
                  className="w-16 h-16 rounded-full mt-4 ring-2 ring-pink"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
