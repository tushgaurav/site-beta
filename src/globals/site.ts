import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
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

export const about: GlobalConfig = {
  slug: 'about',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
          FixedToolbarFeature(),
        ],
      }),
      required: true,
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
