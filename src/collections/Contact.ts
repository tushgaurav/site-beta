import type { CollectionConfig } from "payload";

export const ContactMessages: CollectionConfig = {
    slug: 'contact-messages',
    admin: {
        useAsTitle: 'name'
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'message',
            type: 'textarea',
            required: true,
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'category',
            type: 'text',
            required: true,
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'sendCopy',
            type: 'checkbox',
            required: false,
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'createdAt',
            type: 'date',
            required: true,
            defaultValue: new Date(),
            admin: {
                readOnly: true,
            },
        },
    ]
}