"use client"

import { getRecipes, getTags } from '@/sanity/sanity-utils'
import Image from 'next/image'
import Link from 'next/link';
import SearchRecipes from '../components/SearchRecipes';
import { useEffect, useState } from 'react';
import { Recipe } from '@/types/Recipe';
import { Tag } from '@/types/Tag';
import { FaClock } from 'react-icons/fa';
import { FaChartPie } from "react-icons/fa";

export default function Home() {
  const [update, setUpdate] = useState([])
  const [recipes, setRecipe] = useState<any>([])
  const [tags, setTags] = useState<any>([])

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipes = await getRecipes();
      setRecipe(recipes)
    }
    const fetchTags = async () => {
      const tags = await getTags();
      setTags(tags)
    }
    fetchRecipe();
    fetchTags();
  },[])

  const handleSubmit = async (e: any) => {
    const response = await fetch(`/api/search?query=${e.target.value}`);
    const recipe = await response.json();
    setRecipe(recipe)
  }

  return (
    <div>
      <h1 className='mt-5 text-5xl'>Recipe Book</h1>
      <div className='mt-10 flex'>
        <SearchRecipes getSearchResults={(results: any) => setRecipe(results)} />
      </div>
      <div className='mt-5 flex gap-5 flex-wrap'>
      <button onClick={handleSubmit} className='bg-zinc-800 p-3 border border-zinc-800 rounded-xl text-center' value="">All</button>
        {tags.map((tag: Tag) => (
          <button key={tag._id} onClick={handleSubmit} className='bg-zinc-800 p-3 border border-zinc-800 rounded-xl text-center' value={ tag.name }>{ tag.name }</button>
        ))}
      </div>
      <h2 className='mt-5 text-3xl'>Recipes</h2>
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
