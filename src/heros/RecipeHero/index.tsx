import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import { FaTags, FaClock, FaChartPie, FaCalendarDay, FaUser, FaLink } from 'react-icons/fa6'

import type { Recipe } from '@/payload-types'

import { Media } from '@/components/Media'
import Link from 'next/link'

export const RecipeHero: React.FC<{
  recipe: Recipe
}> = ({ recipe }) => {
  const {
    categories,
    meta: { image: metaImage } = {},
    populatedAuthors,
    publishedAt,
    title,
    time,
    serves,
    originalrecipe,
  } = recipe

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="flex items-center uppercase text-sm mb-6">
            <FaTags className="inline" />
            &nbsp;
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            <div className="flex flex-col gap-4">
              {populatedAuthors && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm flex justify-center items-center">
                    <FaUser className="inline" />
                    &nbsp;
                    <span>
                      {populatedAuthors.map((author, index) => {
                        const { name } = author

                        const isLast = index === populatedAuthors.length - 1
                        const secondToLast = index === populatedAuthors.length - 2

                        return (
                          <React.Fragment key={index}>
                            {name}
                            {secondToLast && populatedAuthors.length > 2 && (
                              <React.Fragment>, </React.Fragment>
                            )}
                            {secondToLast && populatedAuthors.length === 2 && (
                              <React.Fragment> </React.Fragment>
                            )}
                            {!isLast && populatedAuthors.length > 1 && (
                              <React.Fragment>and </React.Fragment>
                            )}
                          </React.Fragment>
                        )
                      })}
                    </span>
                  </p>
                </div>
              )}
            </div>
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm flex justify-center items-center">
                  <FaCalendarDay className="inline" />
                  &nbsp;<time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
                </p>
              </div>
            )}
            {time && (
              <div className="flex flex-col gap-1">
                <p className="text-sm flex justify-center items-center">
                  <FaClock className="inline" />
                  &nbsp;{time}
                </p>
              </div>
            )}
            {serves && (
              <div className="flex flex-col gap-1">
                <p className="text-sm flex justify-center items-center">
                  <FaChartPie className="inline" />
                  &nbsp;Serves {serves}
                </p>
              </div>
            )}
            {originalrecipe && (
              <div className="flex flex-col gap-1">
                <Link href={originalrecipe} className="text-sm flex justify-center items-center">
                  <FaLink className="inline" />
                  &nbsp;Original Recipe
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {metaImage && typeof metaImage !== 'string' && (
          <Media fill imgClassName="-z-10 object-cover" resource={metaImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
