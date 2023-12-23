import { getRecipes, getTag, getTags } from '@/sanity/sanity-utils'
import { FaClock, FaChartPie } from 'react-icons/fa';
import { Recipe } from '@/types/Recipe';

import Image from 'next/image'
import Link from 'next/link';

type Props = {
    params: { tag: string };
};

export default async function Tag({ params }: Props) {
  const slug = params.tag;
  const tag = await getTag(slug);
  const recipes = (await getRecipes()).filter(recipe => {return recipe.tags.includes(tag.name)});

  return (
    <div>
      <h1 className='mt-5 text-5xl'>Tagged with {tag.name}</h1>
      <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recipes.map((recipe: Recipe) => (
          <Link key={recipe._id} href={`/recipes/${recipe.slug}`} className='bg-zinc-800 flex flex-col border border-zinc-800 rounded-xl p-3'>
            { recipe.image && (
                <Image
                  src={ recipe.image }
                  alt={ recipe.name }
                  width={ 500 }
                  height={ 100 }
                  className="object-cover rounded-lg max-h-[250px]"
                />
              )}
            <div className='mt-2 grow font-bold text-xl'>{recipe.name}</div>
            <div className="mt-2 flex justify-between text-sm text-gray-300">
              <p className='flex items-center'><FaClock className="inline"/>&nbsp;{recipe.time}</p>
              <p className='flex items-center'><FaChartPie className="inline"/>&nbsp;Serves {recipe.servings}</p>
            </div>
          </Link>
        ))}  
      </div>
    </div>
  )
}
