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
import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      const notify = () => toast("Error signing in");
      notify();
      // toast({
      //   title: "You are not signed in as an Admin",
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-red">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // })
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
      <ToastContainer />
    </Form>
  )
}
