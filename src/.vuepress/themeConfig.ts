import { hopeTheme } from "vuepress-theme-hope";
import { navbarConfig } from "./navbar";
import { sidebarConfig } from "./sidebar";

export const themeConfig = hopeTheme({
  logo: "/xiaofeipeng.png",
  hostname: "https://cuckoocry.github.io/xiaofeipeng/",

  author: {
    name: "小飞蓬",
    url: "https://cuckoocry.github.io/xiaofeipeng/",
  },

  // iconAssets 使用
  // 关键词: "iconfont", "iconify", "fontawesome", "fontawesome-with-brands"
  iconAssets: "iconfont",
  //iconAssets: "//at.alicdn.com/t/c/font_2922463_9ir10garej4.css",
  //
  // // 你想要的 URL
  // iconAssets: "/base/my/font-icon/resource.js",

  // 上述内容的数组
  // iconAssets: [
  //   "/base/my/font-icon/resource.js",
  //   "https://example/my/fonr-icon/resouce.css",
  //   "fontawesome",
  // ],


  repo: "https://github.com/cuckoocry/xiaofeipeng",
  docsDir: "docs",

  navbar: navbarConfig,
  sidebar: sidebarConfig,
  pageInfo: [
    "Author",
    "Category",
    "Tag",
    "Date",
    "Original",
    "Word",
    "ReadingTime",
  ],
  blog: {
    medias: {
      // Baidu: "https://example.com",
      // BiliBili: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      // Email: "https://example.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: "https://github.com/cuckoocry/xiaofeipeng",
      // Gitlab: "https://example.com",
      Gmail: "https://jiangyunfei888@gmail.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
    },
  },
  footer: "子在川上曰：“逝者如斯夫，不舍昼夜。",
    // '<a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2021011092号-2</a>',
  displayFooter: true,
  plugins: {
    blog: true,
    copyright: true,
    mdEnhance: {
      // 文件支持任务列表
      tasklist: true,
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      // presentation: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
    feed: {
      json: true,
    },
  },
});
