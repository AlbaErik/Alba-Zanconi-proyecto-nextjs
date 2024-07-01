import Link from 'next/link';
import AdminLinks from './admin-links';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import SignOutButton from './sign_out_button';

export default function SideBar() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-500 p-4 md:h-40"
                href="/"
            >
                <div>
                    <InformationCircleIcon className="h-8 w-8 text-white" />
                    <h2>Inicio</h2>
                </div>

            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <AdminLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

            </div>
            <SignOutButton />
        </div>
    );
}
