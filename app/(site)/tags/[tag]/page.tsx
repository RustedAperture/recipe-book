import { getRecipes, getTag, getTags } from '@/sanity/sanity-utils'
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
      <h1 className='mt-5 text-5xl'>{tag.name}</h1>
      <div className='mt-10 flex'>
        <input type='text' className='grow bg-transparent rounded-xl' placeholder='Search'/>
      </div>
      <div className='mt-5 flex gap-5'>
      </div>
      <h2 className='mt-5 text-3xl'>Recipes</h2>
      <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recipes.map((recipe) => (
          <Link key={recipe._id} href={`/recipes/${recipe.slug}`} className='flex flex-col justify-between border border-gray-500 rounded-xl p-3'>
            { recipe.image && (
                <Image
                  src={ recipe.image }
                  alt={ recipe.name }
                  width={ 250 }
                  height={ 100 }
                  className="object-cover rounded-lg border border-gray-500"
                />
              )}
            <div className='font-bold text-xl'>{recipe.name}</div>
            <div>{recipe.time}</div>
          </Link>
        ))}  
      </div>
    </div>
  )
}
