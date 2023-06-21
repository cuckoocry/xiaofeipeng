import { defineUserConfig } from "vuepress";
import { themeConfig } from "./themeConfig";
import { searchPlugin } from "@vuepress/plugin-search";
import { commentPlugin } from "vuepress-plugin-comment2";
import { seoPlugin } from "vuepress-plugin-seo2";

export default defineUserConfig({
  base: "/xiaofeipeng/",
  theme: themeConfig,
  port: 8099,
  title: "Leo‘Blog",
  description: "vuepress-theme-hope 阿飞的博客",
  head: [
    // meta
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "Guide" }],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
    ["meta", { "http-equiv": "Expires", content: "0" }],
    [
      "meta",
      {
        name: "keywords",
        content:
            "Java基础, 多线程, JVM, 虚拟机, 数据库, MySQL, Spring, Redis, MyBatis, 系统设计, 分布式, RPC, 高可用, 高并发",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    // 添加百度统计
    [
      "script",
      {},
      `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?5dd2e8c97962d57b7b8fea1737c01743";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`,
    ],
    ["link", { rel: "stylesheet", href: "/iconfont/iconfont.css" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    // 用这个 鼠标点击事件才有效
    ["script", {
      "language": "javascript",
      "type": "text/javascript",
      "src": "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"
    }],
    // 引入鼠标点击脚本
    ["script", {
      "language": "javascript",
      "type": "text/javascript",
      "src": "/js/MouseClickEffect.js"
    }],
    //  樱花特效 https://blog.csdn.net/Jay_Chou345/article/details/110190189  暂时注释，有点花里胡哨
    // ["script", {
    //   "language": "javascript",
    //   "type": "text/javascript",
    //   "src": "/js/sakura.js"
    // }],

  ],
  plugins: [

    //   npm i -D @vuepress/plugin-search@next
    searchPlugin({
      // https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
      // 排除首页
      isSearchable: (page) => page.path !== "/",
      maxSuggestions: 10,
      hotKeys: ["s", "/"],
      // 用于在页面的搜索索引中添加额外字段
      getExtraFields: () => [],
      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
    }),

    // 评论 npm i -D vuepress-plugin-comment2
    commentPlugin({
      // https://giscus.app/zh-CN#repository
      // 插件选项
      provider: "Giscus",
      comment: true, //启用评论功能
      repo: "cuckoocry/xiaofeipeng", //远程仓库
      repoId: "R_kgDOJLYAww", //对应自己的仓库Id
      category: "Announcements",
      categoryId: "DIC_kwDOJLYAw84CU-hL" //对应自己的分类Id

    }),

    seoPlugin({
      hostname: "https://cuckoocry.github.io/xiaofeipeng"
    }),

  ],
  locales: {
    "/": {
      lang: "zh-CN",
    }
  },



  // Enable it with pwa
  shouldPrefetch: false,
});
