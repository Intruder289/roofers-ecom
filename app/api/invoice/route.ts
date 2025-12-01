import { NextResponse } from "next/server";
import { generateInvoicePDF } from "@/lib/invoiceService";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // calculate total
    const total = data.items.reduce(
      (sum: number, i: any) => sum + i.qty * i.price,
      0
    );

    // 1️⃣ Save to DB
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: data.id,
        customerName: data.customer.name,
        customerEmail: data.customer.email,
        customerAddress: data.customer.address,
        items: data.items,
        totalAmount: total,
      },
    });

    // 2️⃣ Generate PDF
    const pdfBuffer = await generateInvoicePDF(data);

    // 3️⃣ Save PDF file locally (or to S3)
    const invoicesDir = path.join(process.cwd(), "public", "invoices");
    if (!fs.existsSync(invoicesDir))
      fs.mkdirSync(invoicesDir, { recursive: true });

    const pdfFilePath = path.join(invoicesDir, `${data.id}.pdf`);
    fs.writeFileSync(pdfFilePath, pdfBuffer);

    // 4️⃣ Update invoice record with pdf path
    const pdfUrl = `/invoices/${data.id}.pdf`;
    await prisma.invoice.update({
      where: { id: invoice.id },
      data: { pdfUrl },
    });

    // 5️⃣ Return response
    return NextResponse.json({
      message: "Invoice created successfully",
      invoice: { ...invoice, pdfUrl },
      downloadLink: pdfUrl,
    });
  } catch (err: any) {
    console.error("Error generating invoice:", err);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
