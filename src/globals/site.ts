import type { GlobalConfig } from 'payload'

export const homepage: GlobalConfig = {
  slug: 'homepage',
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'text',
    },
    {
      name: 'featuredArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
  ],
}
