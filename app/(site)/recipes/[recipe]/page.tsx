import { getRecipe } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

import Image from "next/image";

type Props = {
    params: { recipe: string };
};

export default async function Recipe({ params }: Props) {
    const slug = params.recipe;
    const recipe = await getRecipe(slug);

    const generateKey = (pre: string) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    const creation = new Date(recipe._createdAt);

    return (
        <div className="mt-5">
            <header className="lg:flex lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
                        { recipe.name }
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-300">
                            { recipe.author }
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-300">
                            { creation.toDateString() }
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-300">
                            <PortableText value={ recipe.content } />
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-300 sm:hidden">
                        <a
                            href={ recipe.source } title="View Recipe" target="_blank" rel="noopener noreferrer"
                            className="underline"
                        >
                            Original Recipe
                        </a>
                        </div>
                    </div>
                </div>
                <div className="sm:mt-5 flex lg:ml-4 lg:mt-0">
                    <span className="hidden sm:block">
                        <a
                            href={ recipe.source } title="View Recipe" target="_blank" rel="noopener noreferrer"
                            type="button"
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Original Recipe
                        </a>
                    </span>
                </div>
            </header>
            <section className="lg:flex lg:items-center lg:justify-between my-5">
                { recipe.image && (
                    <Image
                        src={ recipe.image }
                        alt={ recipe.name }
                        width={ 500 }
                        height={ 100 }
                        className="object-cover rounded-lg"
                    />
                )}
            </section>
            <div className="max-w-none prose prose-invert">
                <h2 className="drop-shadow">Ingredients</h2>
                <ul role="list" className="marker:text-white list-inside list-disc">
                    {recipe.ingredients.map((ingredient) => (
                        <li key={ generateKey(ingredient) } className="py-0.5">
                            {ingredient}
                        </li>
                    ))}
                </ul>
                <h2 className="drop-shadow">Instructions</h2>
                <ul className="marker:text-white list-decimal list-inside">
                    {recipe.instructions.map((instruction) => (
                        <li key={ generateKey(instruction) } className="py-0.5">
                            {instruction}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
