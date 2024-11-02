import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc, payload }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, title, meta, excerpt, time, serves } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    details: {
      time,
      serves,
    },
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    // get full categories and keep a flattened copy of their most important properties
    try {
      const mappedCategories = await Promise.all(
        categories.map(async (category) => {
          const title = await payload.findByID({
            collection: 'categories', // required
            id: category, // required
          })

          return {
            relationTo: 'categories',
            id: title['id'],
            title: title['title'],
          }
        }),
      )

      modifiedDoc.categories = mappedCategories
    } catch (err) {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search. ${err}`,
      )
    }
  }

  return modifiedDoc
}
