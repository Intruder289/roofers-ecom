import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AdminDashboard from "./adminPage";
import { redirect } from "next/navigation";


export default async function Admin() {

  return <AdminDashboard/>
}