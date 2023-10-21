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

export type AttributeToBeRemoved =
  | string
  | { type: 'static' | 'dynamic'; value: string }

export default function createAttributesRemover(attributes: AttributeToBeRemoved[]): NodeTransform {
  if (!attributes.length)
    return () => undefined

  const [staticAttributes, dynamicAttributes]: [string[], string[]] = [[], []]

  attributes
    .forEach((attribute) => {
      if (typeof attribute === 'string') {
        staticAttributes.push(attribute)
        dynamicAttributes.push(attribute)

        return
      }

      if (attribute.type === 'static') {
        staticAttributes.push(attribute.value)
        return
      }

      dynamicAttributes.push(attribute.value)
    })

  return (node): void => {
    if (node.type !== NODE_TYPES.ELEMENT)
      return

    node.props = node.props
      .filter((prop) => {
        if (prop.type === NODE_TYPES.ATTRIBUTE)
          return !staticAttributes.includes(prop.name)

        if (prop.type === NODE_TYPES.DIRECTIVE && prop.arg?.type === NODE_TYPES.SIMPLE_EXPRESSION)
          return !dynamicAttributes.includes(prop.arg.content)

        return true
      })
  }
}
