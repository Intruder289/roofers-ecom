import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, description, image, inStock, featured, category } = body;

    if (!name || price === undefined || !description || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data:{
        price,
        name,
        description,
        image,
        inStock,
        featured,
        category,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({ 
      orderBy: { createdAt: "desc" } 
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}