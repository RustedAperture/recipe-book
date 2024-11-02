import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Recipe } from '@/payload-types'

import { Card } from '../../components/Card'

export type RelatedRecipesProps = {
  className?: string
  docs?: Recipe[]
  introContent?: any
}

export const RelatedRecipes: React.FC<RelatedRecipesProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} relationTo="recipes" showCategories />
        })}
      </div>
    </div>
  )
}