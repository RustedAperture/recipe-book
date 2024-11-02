import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Category } from '@/payload-types'

import { CategoryCard } from '@/components/Card'

export type Props = {
  categories: Category[]
}

export const CollectionCategory: React.FC<Props> = (props) => {
  const { categories } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {categories?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-2" key={index}>
                  <CategoryCard className="" doc={result} relationTo="categories" />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
