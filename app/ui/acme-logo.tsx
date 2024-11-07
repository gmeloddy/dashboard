import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} text-white p-4 md:p-0`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <Image src="/logo.png" 
        width={100}
        height={100}
        alt="DataVerse" className="text-[44px]" 
      />
    </div>
  );
}
