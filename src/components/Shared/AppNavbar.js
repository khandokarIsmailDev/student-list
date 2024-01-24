import React from 'react';
import Link from "next/link";

const AppNavbar = () => {
    return (
        <nav className="w-3/4 mx-auto px-2">
            <ul className="flex justify-center">
                <li className='mr-4 hover:text-blue-600'>
                    <Link href="/" prefetch={false}>
                        Home
                    </Link>
                </li>
                <li className='mr-4 hover:text-blue-600'>
                    <Link href="/addStudent">
                        Add Student
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default AppNavbar;