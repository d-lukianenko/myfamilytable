import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.deleteMany();
  await prisma.recipe.createMany({
    data: [
      {
        title: 'Oat Kefir Crepes',
        description:
          'These crepes were inspired by Ukrainian mlyntsi - my version with kefir and oat flour',
      },
    ],
  });
  const count = await prisma.recipe.count();
  console.log(`Seeded ${count} recipes`);
}

void (async () => {
  try {
    await main();
    process.exitCode = 0;
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();
