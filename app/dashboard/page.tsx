import { auth } from "@clerk/nextjs/server";
import DashboardClient from "@/app/dashboard/DashboardClient";
import Link from "next/link";

export default async function DashboardPage() {
    const { userId, isAuthenticated } = await auth();

    if (!isAuthenticated) {
        return <div className='flex flex-col gap-5 py-4'>
            <p className='text-center text-3xl'>You must be logged in to access the dashboard.</p>
            <p className='hover:text-cyan-400 text-center text-3xl'><Link href='/sign-in'>Return To Login</Link></p>
        </div>;

    }

    return <DashboardClient userId={userId} />;
}
