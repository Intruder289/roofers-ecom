import { auth } from "@/lib/auth";
import AuthForm from "./authPage";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Authentication () {

  const session = await auth.api.getSession({
    headers: await headers()}
  )
  if(session ){
    redirect("/")
  }
  return (<AuthForm/>)
}