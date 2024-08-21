import prisma from "../db/prisma.js";

async function main() {
  const addressInitialization = await prisma.address.createMany({
    data: [
      {
        addressDescription: "address 1",
      },
      {
        addressDescription: "address 2",
      },
      {
        addressDescription: "address 3",
      },
      {
        addressDescription: "address 4",
      },
      {
        addressDescription: "address 5",
      },
      {
        addressDescription: "address 6",
      },
    ],
  });

  const productInitialization = await prisma.product.createMany({
    data: [
      {
        name: "product 1",
        description: "product 1 description",
        price: 100,
        image: "image 1",
      },
      {
        name: "product 2",
        description: "product 2 description",
        price: 200,
        image: "image 2",
      },
      {
        name: "product 3",
        description: "product 3 description",
        price: 300,
        image: "image 3",
      },
    ],
  });

  const userInitialization = await prisma.user.createMany({
    data: [
      {
        name: "Duy Anh",
        email: "anhvdd@hblab.vn",
        password: "123456",
        addressId: 1,
      },
      {
        name: "Duy Anh1",
        email: "anhvdd1@hblab.vn",
        password: "123456",
        addressId: 1,
      },
      {
        name: "Duy Anh2",
        email: "anhvdd2@hblab.vn",
        password: "123456",
        addressId: 2,
      },
    ],
  });

  const orderInitialization = await prisma.order.createMany({
    data: [
      {
        userId: 1,
        addressId: 1,
      },
      {
        userId: 2,
        addressId: 2,
      },
    ],
  });
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
