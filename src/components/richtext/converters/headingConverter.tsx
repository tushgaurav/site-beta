import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })

    const textContent = children
      .map((child) => (typeof child === 'string' ? child : ''))
      .join('')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    const id = textContent || undefined

    const baseClasses = 'font-bold tracking-tight scroll-mt-24'

    switch (node.tag) {
      case 'h1':
        return (
          <h1 id={id} className={`${baseClasses} text-4xl md:text-5xl mb-8 mt-12 first:mt-0`}>
            {children}
          </h1>
        )
      case 'h2':
        return (
          <h2 id={id} className={`${baseClasses} text-3xl md:text-4xl mb-6 mt-10 first:mt-0`}>
            {children}
          </h2>
        )
      case 'h3':
        return (
          <h3 id={id} className={`${baseClasses} text-2xl md:text-3xl mb-4 mt-8 first:mt-0`}>
            {children}
          </h3>
        )
      case 'h4':
        return (
          <h4 id={id} className={`${baseClasses} text-xl md:text-2xl mb-4 mt-6 first:mt-0`}>
            {children}
          </h4>
        )
      case 'h5':
        return (
          <h5 id={id} className={`${baseClasses} text-lg md:text-xl mb-3 mt-6 first:mt-0`}>
            {children}
          </h5>
        )
      case 'h6':
        return (
          <h6 id={id} className={`${baseClasses} text-base md:text-lg mb-3 mt-6 first:mt-0`}>
            {children}
          </h6>
        )
      default:
        const Tag = node.tag
        return <Tag id={id}>{children}</Tag>
    }
  },
}
