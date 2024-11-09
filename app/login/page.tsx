"use client";

import Image from 'next/image'
import Link from 'next/link'
import { LoginForm } from '@/app/ui/login-form';

const LoginPage = () => {
  
  return (
    <section className='h-screen w-screen bg-white relative px-2'>
        <div className='md:grid grid-cols-2 h-full place-content-center'>
        <div className='hidden md:block w-full relative md:order-2'>
            {/* <Image src='/logo.png' alt='bg' width={400} height={400} className='absolute translate-x-[50%] right-[50%]  top-[50%] -translate-y-[50%] z-50'/> */}
            <Image className="h-full w-full object-cover rounded-md" src="/logo.png" 
            width={500} height={500}
            alt="Random image" />
              <div className="absolute inset-0 bg-green-200 opacity-60 rounded-md"></div>
                  {/* <Image src='/logo.png' alt='bg' width={400} height={400} className='absolute translate-x-[50%] right-[50%]  top-[50%] -translate-y-[50%] z-50'/>       */}
          </div>
          
          <div className='p-4 md:p-8 text-sm md:text-lg w-full max-w-[600px] place-self-center h-screen md:h-auto flex flex-col justify-center items-center md:block overflow-hidden'>
            <Link href="/login" className='px-4'>
              <div className='flex justify-center items-center max-w-[700px] mx-auto relative'>
                <Image src='/logo.png' alt='logo' width={100} height={100} className='p-2'/>
                <div className='border-l-2 h-32 mx-8 border-black/30'></div>
                <div>
                  <p className='text-green-dsn font-extrabold text-xl'>Login</p>
                </div>
              </div>
            </Link>

            <div className='shadow-xl bg-transparent p-4 place-content-center pb-8'>
              <LoginForm />
            </div>
            
          </div>
        </div>
    </section>
  )
}

export default LoginPage;