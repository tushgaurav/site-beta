import type { CollectionConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const Hobbies: CollectionConfig = {
    slug: 'hobbies',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'publishedAt'],
    },
    versions: {
        drafts: true,
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Hobby Title',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.title) {
                      return data.title
                        .toLowerCase()
                        .replace(/ /g, '-')
                        .replace(/[^\w-]+/g, '')
                    }
                    return value
                  },
                ],
              },
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
            defaultValue: 'draft',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData.status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
        {
            name: 'description',
            type: 'text',
            required: true,
            label: 'Hobby Description',
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
            label: 'Hobby Content',
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
            }),
        },
    ]
}