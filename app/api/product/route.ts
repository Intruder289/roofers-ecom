import { NextResponse } from 'next/server';

const mockProducts = [
  {
    id: '1',
    name: 'Classic Roofing Tile',
    price: 199.99,
    description: 'Premium quality roofing tile with exceptional durability',
    image: '/products/tile1.jpg'
  },
  {
    id: '2',
    name: 'Modern Slate Roof',
    price: 299.99,
    description: 'Contemporary slate roofing for modern homes',
    image: '/products/tile2.jpg'
  },
  {
    id: '3',
    name: 'Metal Roofing Sheet',
    price: 159.99,
    description: 'Durable metal roofing for industrial applications',
    image: '/products/tile3.jpg'
  },
  {
    id: '4',
    name: 'Solar Roof Tiles',
    price: 399.99,
    description: 'Energy-efficient solar roof tiles',
    image: '/products/tile4.jpg'
  },
];

export async function GET() {
  return NextResponse.json(mockProducts);
}