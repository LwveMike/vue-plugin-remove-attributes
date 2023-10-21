import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import createAttributesRemover from '../src/index'

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        nodeTransforms: [
          createAttributesRemover(['data-test']),
        ],
      },
    },
  })],
})
