import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.deleteMany();
  await prisma.recipe.createMany({
    data: [
      {
        title: 'Oat Kefir Crepes',
        description:
          'Ukrainian mlyntsi-style crepes with kefir and a wholesome oat twist.',
        imagePublicId: 'oat-kefir-crepes',
        ingredients: [],
        steps: [],
        tips: [],
        tags: [],
      },
      {
        title: 'Banana Strawberry Smoothie',
        description:
          'A fruity, kid-friendly snack that is ready in minutes.',
        imagePublicId: 'banana-strawberry-smoothie',
        ingredients: [],
        steps: [],
        tips: [],
        tags: [],
      },
      {
        title: 'Creamy Mushroom Quiche',
        description:
          'A cozy bake for when you have a bit of extra time.',
        imagePublicId: 'creamy-mushroom-quiche',
        ingredients: [],
        steps: [],
        tips: [],
        tags: [],
      }
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
