import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  admin: {
    useAsTitle: 'quote',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: false,
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/quotes')
      },
    ],
    afterDelete: [
      () => {
        revalidatePath('/quotes')
      },
    ],
  },
}
