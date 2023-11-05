import { SearchCard } from "@/src/common/components/elements/Cards";
import { db } from "@db/index";
import { authOptions } from "@server/auth";
import { recipes } from "@db/schemas";
import { Info } from "@db/types";
import { eq, or } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function DraftsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <h1>No recipes found</h1>;
  }

  const gotRecipes = (await db.query.info.findMany({
    where: or(
      eq(recipes.createdBy, session.user.id),
      eq(recipes.lastUpdatedBy, session.user.id)
    ),
  })) as Info[];

  return (
    <main>
      <div className="mt-4">
        <h1 className="mb-2 text-center text-step0">Draft Recipes</h1>
        <ul className="flex flex-row flex-wrap justify-center gap-4">
          {gotRecipes.map((recipe, index) => {
            return <SearchCard as="li" key={index} recipe={recipe} />;
          })}
        </ul>
      </div>
    </main>
  );
}