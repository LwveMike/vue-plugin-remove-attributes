import { describe, expect, it } from 'vitest'
import { compileTemplate } from '@vue/compiler-sfc'
import type { NodeTransform } from '@vue/compiler-core'
import createAttributesRemover from '../src'

describe('createAttributesRemover', () => {
  const template
    = `<template>
      <div>
        <header data-test="header-test">
          Header
        </header>
        <section :data-test="'section-content'">
          <ul>
            <li
              :data-test="'item-text'"
              v-text="'text'"
            />
          </ul>
          <div data-meta="not-secure-meta">
            Meta 
          </div>
        </section>
        <footer dataTest="footer-test">
          Footer
        </footer>
      </div>
    </template>`

  const parse = (removeParameters: NodeTransform) => {
    return compileTemplate({
      id: 'TestComponent.vue',
      filename: 'TestComponent.vue',
      source: template,
      compilerOptions: {
        nodeTransforms: [removeParameters],
      },
    }).code
  }

  describe('empty attributes', () => {
    it('should not change anything', () => {
      const code = parse(createAttributesRemover([]))

      expect(code).toMatchSnapshot()
    })
  })
  describe('with attributes', () => {
    it('should remove all data-test and data-meta', () => {
      const code = parse(createAttributesRemover(['data-test', 'data-meta']))

      expect(code).toMatchSnapshot()
    })
  })
})
