// 'use client';
 
// import { lusitana } from '@/app/ui/fonts';
// import {
//   AtSymbolIcon,
//   KeyIcon,
//   ExclamationCircleIcon,
// } from '@heroicons/react/24/outline';
// import { ArrowRightIcon } from '@heroicons/react/20/solid';
// import { Button } from '@/app/ui/button';
// import { useActionState } from 'react';
// import { authenticate } from '@/lib/actions';
// import { signIn } from "next-auth/react"
 



// export default function LoginForm() {
//   const [errorMessage, formAction, isPending] = useActionState(
//     authenticate,
//     undefined,
//   );
 
//   return (
//     <form action={formAction} className="space-y-3">
//       <div className="flex-1 rounded-lg">
//         <h1 className={`${lusitana.className} mb-3 text-2xl`}>
//           Log in to see Dashboard
//         </h1>
//         <div className="w-full">
//           <div>
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email address"
//                 required
//               />
//               <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="password"
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 required
//                 minLength={6}
//               />
//               <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>
//         <Button className="mt-4 w-full" aria-disabled={isPending}>
//           Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//         </Button>
//         <div
//           className="flex h-8 items-end space-x-1"
//           aria-live="polite"
//           aria-atomic="true"
//         >
//           {errorMessage && (
//             <>
//               <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
//               <p className="text-sm text-red-500">{errorMessage}</p>
//             </>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// }



"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { ColorRingComponent } from "@/loaders/ColorRingComponent"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
})

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    console.log("response after login", response)

    if (response?.ok) {
      router.push("/dashboard")
      setTimeout(() => setLoading(false), 6000)
    } else {
      setLoading(false)
      toast({
        title: "You are not signed in as an Admin",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-red">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* <h1 className="text-md text-black/50 max-w-[200px]">Please Enter your Details</h1> */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@gmail.com" type="email" {...field} className="rounded-xl" />
              </FormControl>
              <FormDescription>
                Kindly enter your email address
              </FormDescription>
              <FormMessage className="text-red-500"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} className="rounded-xl" />
              </FormControl>
              <FormDescription>
                Kindly enter your password
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button type="submit" className="active:bg-orange-400 
        hover:bg-orange-500 hover:text-white
        rounded-xl max-w-[200px] text-black flex items-center 
        justify-center space-x-2 shadow-xl"
        variant="default" size="default"
        >
          {loading && (
            <ColorRingComponent size="40" isvisible={loading}  />
          )}
          
          <span className={`${loading ? "ml-4": ""}`}>Login</span>
        </Button>


        {/* already have an account */}
        <div className="text-sm text-black/50 text-center">
          <p className="text-sm">Don't have an account?</p>
          <Link href="/signup" className="text-black/50 text-sm font-bold underline hover:text-black">Sign up</Link>
        </div>
      </form>
    </Form>
  )
}
