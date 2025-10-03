import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

import { headingConverter } from '@/components/richtext/converters/headingConverter'
import {
  paragraphConverter,
  listConverter,
  codeConverter,
  quoteConverter,
  linebreakConverter,
} from '@/components/richtext/converters/textConverters'
import { inlineConverters } from '@/components/richtext/converters/inlineConverters'
import {
  uploadConverter,
  horizontalRuleConverter,
} from '@/components/richtext/converters/mediaConverters'

type NodeTypes = DefaultNodeTypes

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...headingConverter,
  ...paragraphConverter,
  ...listConverter,
  ...codeConverter,
  ...quoteConverter,
  ...linebreakConverter,
  ...inlineConverters,
  ...uploadConverter,
  ...horizontalRuleConverter,
})
