import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   Create a user
  await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@admin.com",
    },
  });

  //create a product
  const productsToCreate = [
    {
      name: "product1",
      price: 12000,
      description: "this is some description for product1",
      image: "/images/product1.jpg",
    },
    {
      name: "product2",
      price: 25000,
      description: "a great second product",
      image: "/images/product2.jpg",
    },
    {
      name: "product3",
      price: 8000,
      description: "the final product in the set",
      image: "/images/product3.jpg",
    },
  ];

  await prisma.product.createMany({
    data: productsToCreate,
    skipDuplicates: true,
    // skipDuplicates: true,
  });

  console.log("Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
