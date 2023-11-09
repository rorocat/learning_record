import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端学习之旅",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'JavaScript基础知识', link: '/basic/type' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'JavaScript基础知识',
        items: [
          {
            text: '基础类型',
            link: '/basic/type'
          },
          {
            text: 'This',
            link: '/basic/this'
          },
          {
            text: 'apply/bind/call原理',
            link: '/basic/this'
          },
          {
            text: 'new原理',
            link: '/basic/new'
          },
          {
            text: '原型/原型链',
            link: '/basic/prototype'
          },
          {
            text: '闭包',
            link: '/basic/closure',
          },
          {
            text: '深拷贝与浅拷贝',
            link: '/basic/copy'
          }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
  }
})
