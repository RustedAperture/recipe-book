import { getRecipe } from "@/sanity/sanity-utils";
import { FaClock } from 'react-icons/fa';
import { FaChartPie } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import type { Metadata } from 'next'

import Image from "next/image";
import Head from "next/head";

type Props = {
    params: { recipe: string };
};

export const generateMetadata = async (
    props: Props
): Promise<Metadata> => {
    const { params } = props
    const recipe = await getRecipe(params.recipe)
    return {
        title: "Recipe Book | " + recipe.name,
        description: "Check out this recipe on my website",
        openGraph: {
            title: "Recipe Book | " + recipe.name,
            images: [recipe.image],
            description: "Check out this recipe on my website",
        },
    };
};

export default async function Recipe({ params }: Props) {
    const slug = params.recipe;
    const recipe = await getRecipe(slug);

    const generateKey = (pre: string) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    const creation = new Date(recipe._createdAt);

    return (
        <div className="mt-5 sm:bg-zinc-800 sm:p-5 rounded-lg">
            <section className="lg:flex lg:items-center lg:justify-between mb-10">
                { recipe.image && (
                    <Image
                        src={ recipe.image }
                        alt={ recipe.name }
                        width={ 500 }
                        height={ 100 }
                        className="object-cover rounded-lg min-w-full max-h-[300px]"
                    />
                )}
            </section>
            <header className="my-10 lg:flex lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
                        { recipe.name }
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-300">
                            <FaUser className="inline"/>&nbsp;{ recipe.author }
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-300">
                            <FaCalendarDay className="inline"/>&nbsp;{ creation.toDateString() }
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-300">
                            <FaChartPie className="inline"/>&nbsp;Serves { recipe.servings }
                        </div>
                        <div className="mt-2 flex items-center content-baseline text-sm text-gray-300">
                            <FaClock className="inline"/>&nbsp;{ recipe.time }
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-300">
                            <FaLink className="inline"/>&nbsp;
                            <a
                                href={ recipe.source } title="View Recipe" target="_blank" rel="noopener noreferrer"
                                className="underline"
                            >
                                 Original Recipe
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <div className="max-w-none prose prose-invert">
                <h2 className="drop-shadow">Ingredients</h2>
                <ul role="list" className="pl-0 marker:text-white list-inside list-disc">
                    {recipe.ingredients.map((ingredient) => (
                        <li key={ generateKey(ingredient) } className="pl-0 py-0.5">
                            {ingredient}
                        </li>
                    ))}
                </ul>
                <h2 className="drop-shadow mt-0">Instructions</h2>
                <ul className="pl-0 marker:text-white list-decimal list-inside">
                    {recipe.instructions.map((instruction) => (
                        <li key={ generateKey(instruction) } className="pl-0 py-0.5">
                            {instruction}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
