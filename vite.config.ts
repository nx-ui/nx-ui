/*
 * @Author: next-ui 55926111@qq.com
 * @Date: 2022-12-27 15:59:28
 * @LastEditors: next-ui 55926111@qq.com
 * @LastEditTime: 2022-12-29 10:38:07
 * @FilePath: \NxUI\vite.config.ts
 * @Description:
 *
 * Copyright (c) 2022 by next-ui 55926111@qq.com, All Rights Reserved.
 */
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '/#': fileURLToPath(new URL('./types', import.meta.url)),
      '/#/*': fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
  build: {
    // 到处文件目录，next-ui 用于存放package.json，避免被覆盖
    // 这里不设置也是默认dist
    outDir: 'dist',
    // 兼容
    target: 'es2015',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(fileURLToPath(new URL('./', import.meta.url)), 'src/index.ts'),
      name: 'NxUI',
      // the proper extensions will be added
      // 如果不用format文件后缀可能会乱
      fileName: (format) => `nx-ui.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "@/assets/global.scss";',
        // additionalData: '@use "@/assets/global.scss" as *;'
      },
      less: {
        charset: false,
        javascriptEnabled: true,
        additionalData: '@import "@/assets/global.less";',
      },
    },
  },
  test: {
    // 启用类似 jest 的全局测试 API
    globals: true,
    // 生成覆盖率
    coverage: {
      provider: 'istanbul', // or 'c8'
    },
    environment: 'happy-dom',
  },
})
