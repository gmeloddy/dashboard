"use client";

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
// import { signOut } from '@/auth';
// import { signOut } from '@/app/api/auth/[...nextauth]';

// export const experimental_ppr = true;

export default function SideNav() {

  const handleSignOut = (e: any) => {
    e.preventDefault();
    signOut({ callbackUrl: '/login',  redirect:true  });
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 justify-start items-center md:justify-center md:ml-8 rounded-md md:p-4 md:h-40 "
        href="https://dataversemedia.com/new/index.html"
      >
        <div className="w-20 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" onClick={handleSignOut} >
            <PowerIcon className="w-6"/>
            <div className="hidden md:block">Sign Out</div>
          </button>
      </div>
    </div>
  );
}
