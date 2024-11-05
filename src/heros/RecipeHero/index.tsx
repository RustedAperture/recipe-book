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
    <div>
      <div className="min-h-full select-none container mb-8 lg:grid lg:grid-cols-[1fr_48rem_1fr]">
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            className="col-start-1 col-span-1 md:col-start-2"
            imgClassName="min-w-full rounded-lg aspect-square object-cover"
            resource={metaImage}
          />
        )}
      </div>
      <div className="relative flex items-end">
        <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
          <div className="col-start-1 col-span-1 md:col-start-2">
            <div className="flex items-center uppercase text-sm mb-6 text-primary">
              <FaTags className="inline" />
              <span className="ps-2">
                {categories?.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    const { title: categoryTitle } = category

                    const titleToUse = categoryTitle || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <React.Fragment key={index}>
                        <Link className="hover:underline" href={`/categories/${titleToUse}`}>
                          {titleToUse}
                        </Link>
                        {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                      </React.Fragment>
                    )
                  }
                  return null
                })}
              </span>
            </div>

            <div className="">
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl text-primary">{title}</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:justify-between">
              <div className="flex flex-col gap-4">
                {populatedAuthors && (
                  <div className="flex flex-col gap-1">
                    <p className="text-sm flex justify-start items-center text-primary">
                      <FaUser className="inline" />
                      <span className="ps-2">
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
                  <p className="text-sm flex justify-start items-center text-primary">
                    <FaCalendarDay className="inline" />
                    <span className="ps-2">
                      <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
                    </span>
                  </p>
                </div>
              )}
              {time && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm flex justify-start items-center text-primary">
                    <FaClock className="inline" />
                    <span className="ps-2">{time}</span>
                  </p>
                </div>
              )}
              {serves && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm flex justify-start items-center text-primary">
                    <FaChartPie className="inline" />
                    <span className="ps-2">Serves {serves}</span>
                  </p>
                </div>
              )}
              {originalrecipe && (
                <div className="flex flex-col gap-1">
                  <Link
                    href={originalrecipe}
                    className="text-sm flex justify-start items-center text-primary"
                  >
                    <FaLink className="inline" />
                    <span className="hover:underline ps-2">Original Recipe</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
