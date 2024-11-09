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
import { useState } from "react"
import Link from "next/link"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
})

export function SignUpForn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const returnedData = await response.json()
    console.log("returnedData from server", returnedData)

    if (response?.status === 200) {
      router.push("/login")
      setTimeout(() => setLoading(false), 6000)
    } else {
      setLoading(false)
      const notify = () => toast("Error signing up");
      // toast({
      //   title: "Cannot create user",
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-red">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // })
      notify();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* <h1 className="text-md text-black/50 max-w-[200px]">Please Enter your Details</h1> */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <FormControl>
                <Input placeholder="Data Science Inc" type="text" {...field} className="rounded-xl" />
              </FormControl>
              <FormDescription>
                Kindly enter your organization name
              </FormDescription>
              <FormMessage className="text-red-500"/>
            </FormItem>
          )}
        />
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
        <Button type="submit" className="mt-4 bg-orange-400 active:bg-orange-500 hover:bg-orange
        rounded-xl max-w-[200px] text-black flex items-center justify-center space-x-2 shadow-xl">
          {loading && (
            <ColorRingComponent size="40" isvisible={loading}  />
          )}
          
          <span className={`${loading ? "ml-4": ""}`}>Create account</span>
        </Button>

        <div className="text-sm text-black/50 text-center">
          <p className="text-sm">Already have an account?</p>
          <Link href="/login" className="text-black/50 text-sm font-bold underline hover:text-black">Login</Link>
        </div>
      </form>

      <ToastContainer />
    </Form>
  )
}
