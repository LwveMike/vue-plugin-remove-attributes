import type { NodeTransform } from '@vue/compiler-core'

/**
 * @see https://github.com/vuejs/core/blob/f5971468e53683d8a54d9cd11f73d0b95c0e0fb7/packages/compiler-core/src/ast.ts#L28
 */
const NODE_TYPES = {
  ELEMENT: 1,
  ATTRIBUTE: 6,
  DIRECTIVE: 7,
  SIMPLE_EXPRESSION: 4,
} as const

export default function createAttributesRemover(attributes: string[]): NodeTransform {
  if (!attributes.length)
    return () => undefined

  return (node): void => {
    if (node.type !== NODE_TYPES.ELEMENT)
      return

    node.props = node.props
      .filter((prop) => {
        if (prop.type === NODE_TYPES.ATTRIBUTE)
          return !attributes.includes(prop.name)

        if (prop.type === NODE_TYPES.DIRECTIVE && prop.arg?.type === NODE_TYPES.SIMPLE_EXPRESSION)
          return !attributes.includes(prop.arg.content)

        return true
      })
  }
}
