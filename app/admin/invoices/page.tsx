"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Invoice } from "@/types";


export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const res = await fetch("/api/invoice");
        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        console.error("Error fetching invoices:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading invoices...</p>
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Invoices</h2>
        <Link
          href="/admin/invoices/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + New Invoice
        </Link>
      </div>

      {/* Table for desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm ">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600">
              <th className="text-left p-3">Invoice #</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="border-t hover:bg-gray-50 transition text-sm"
              >
                <td className="p-3 font-medium">{inv.invoiceNumber}</td>
                <td className="p-3">{inv.customerName}</td>
                <td className="p-3">{inv.customerEmail}</td>
                <td className="p-3 font-semibold text-gray-700">
                  Tzs {inv.totalAmount.toLocaleString()}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      inv.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(inv.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 space-x-2">
                  {inv.pdfUrl && (
                    <a
                      href={inv.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      PDF
                    </a>
                  )}
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <div className="space-y-4 md:hidden">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="bg-white rounded-lg p-4 shadow-sm  text-sm"
          >
            <div className="flex justify-between mb-2">
              <span className="font-semibold">{inv.invoiceNumber}</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  inv.status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {inv.status}
              </span>
            </div>
            <p className="text-gray-700 font-medium">{inv.customerName}</p>
            <p className="text-gray-500">{inv.customerEmail}</p>
            <p className="mt-2 text-gray-700 font-semibold">
              Tzs {inv.totalAmount.toLocaleString()}
            </p>
            <div className="flex justify-between items-center mt-3 text-sm">
              <p className="text-gray-400">
                {new Date(inv.createdAt).toLocaleDateString()}
              </p>
              <div className="space-x-3">
                {inv.pdfUrl && (
                  <a
                    href={inv.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    PDF
                  </a>
                )}
                <button className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
