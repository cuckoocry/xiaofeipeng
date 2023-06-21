import { navbar } from "vuepress-theme-hope";

export const navbarConfig = navbar([
  { text: "首页", icon: "home", link: "/" },

  { text: "学习笔记", icon: "note", link: "/study-notes/" },

  { text: "面试相关", icon: "hot", link: "/interview-related/" },

  { text: "工具", icon: "write", link: "/tools/" },

  { text: "问题记录", icon: "eye",  link: "/problem-record/" },

  { text: "实用技巧",  icon: "ability", link: "/practical-tips/" },

  { text: "感悟随笔", icon: "context", link: "/posts/"},

  { text: "个人收藏", icon: "article", link: "/personal-collection/" },

  {text: "博客相关", icon: "blog", link: "/about-the-blogs/"},

  { text: "实践录", icon: "java", link: "/learning-practice/" },

  { text: "其他", icon: "others", link: "/other/" },


]);
