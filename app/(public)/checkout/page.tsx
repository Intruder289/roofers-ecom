import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import CheckoutPage from "./checkoutPage"

export default async function Checkout(){
  const session = await auth.api.getSession({
      headers: await headers()}
    )
    if(!session ){
      redirect("/auth")
    }
    return ( <CheckoutPage/>)
}