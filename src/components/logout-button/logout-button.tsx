'use client';

import { useRouter } from 'next/navigation';
import {dummyAuth} from "@/components/lib/auth";
import {Button} from "react-day-picker";


export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        dummyAuth.logout();
        router.push('/login');
        router.refresh(); // Ensure UI updates
    };

    return (
        <Button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800"
        >
            Logout
        </Button>
    );
}